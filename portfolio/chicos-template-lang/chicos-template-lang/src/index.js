
window.chsParser = (function(){
  var version = 1.0

  // This function makes regular expressions in js usable
  var regMatch = function(str, regex){
    var m;
    var arr = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        m.index === regex.lastIndex && regex.lastIndex++;
        arr.push(m);
    }
    return arr;
  }

  // This turns a string into a DOM Node
  var createHTML = function(s) {
    var div = document.createElement('div');
    div.innerHTML = s.trim();
    return div.childNodes[0];
  }

  // this takes a template string array and parses it then returns an array of objects that represent the template expressions
  var parseTemplateString = function(templateStrArr){

    var templateName = templateStrArr[1].replace( /\n/g, " " ).split(' ')[0];
    var replaceString = templateStrArr[0];
    var returnVal = { name:templateName, replaceString:replaceString };
    var matchMetadata = [];

    regMatch(replaceString, /(\w+)=\[([^::]*?(::[^]*?::[^]*?)?)\]/gm).map(function(match){
        var md = {}
      
      if(match[1] === 'overwrite' || match[1] === 'append' || match[1] === 'prepend'){
        var arrMatch = regMatch(match[2], /([^\(]+?)::([\s\S]*?[^\\\)])::/gm)[0];
        md.text = arrMatch[0];
        md.selector = arrMatch[1];
        md.content = arrMatch[2];
        matchMetadata.push(md)
      }

      returnVal[match[1]] = matchMetadata;
    });
    return returnVal;
  }

  // This function takes the template string the metadata and template list and injects the template in to the corisponding place in the template string
  var injectHTML = function(templateString, templateMetaData, template){
     Object.keys(templateMetaData).forEach(function(method){
      if(method === 'overwrite' || method === 'append' || method === 'prepend'){
        templateMetaData[method].forEach(function(tpl){
          var templateNode = createHTML(template);
          var templateExpressionContentNode = createHTML(tpl.content)
          try{
            if (method === 'overwrite') {
              templateNode.querySelector(tpl.selector).outerHTML = tpl.content;
            }else if (method === 'append') { 
              templateNode.querySelector(tpl.selector).appendChild(templateExpressionContentNode)
            }else if (method === 'prepend') {
              var selectorNode = templateNode.querySelector(tpl.selector)
              templateNode.querySelector(tpl.selector).appendChild(templateExpressionContentNode)
            }
          }catch(error){
            throw new Error('Selector `'+tpl.selector+'` from template expression `'+templateMetaData.name+'` not found')
          }
          template = templateNode.outerHTML;
        })
      }
    })


    return templateString.replace(templateMetaData.replaceString, template);
  }

  // This will find a template string without a template and clear it out of the templat string.
  var cleanHtml = function(templateString, templateMetaData){
    if(templateMetaData.overwrite){
      templateMetaData.overwrite.forEach(function(tplOverwrite){
        templateString = templateString.replace(templateMetaData.replaceString,  tplOverwrite.content)
      })
      return templateString
    }
    return templateString.replace(templateMetaData.replaceString,  '')
  }

  // This is the function that kicks everything off. it take a string and a list of templates then calls some of the above functions, finally returns a string with the replaced template expressions.
  var render = function(templateString, templates){
    var regex = /\${([^::]*?(::[^]*?::[^]*?)?)}/gm;
    var m;
    
    regMatch(templateString, regex).forEach(function(m){
      var templateMetaData = parseTemplateString(m);

      var template = templates[templateMetaData.name]
      if  (template){
        templateString = injectHTML(templateString, templateMetaData, template);
      }else {
        templateString = cleanHtml(templateString, templateMetaData);
      }

    })
        
    return templateString;
  }

  return {render:render, version:version};
})();
