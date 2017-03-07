var getKey = function(value, obj){
  for(var key in obj){
    if(obj[key] == value){
      return key;
    }
  }
  return null;
};

var dumb = (function(modes){

    var cookieName = 'docsList';


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = 'expires='+d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/; domain='+location.host.substring(location.host.indexOf('.')+1);
    }
    function getCookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return '';
    }
    function adjustFontSize(select) {
      document.getElementById('editor').style.fontSize = select.options[select.selectedIndex].text;
    }
    function goToCname(name) {
        window.location.host = name + '.' + location.host.match(/\w+\.com/)[0];
    }
    function getFiles() {
        var docsList = getCookie(cookieName) || '';
        docsList = docsList ? docsList.split(',') : [];
        return docsList;

    }
    function updateFiles(name, list) {
        if (!~list.indexOf(name)) {
            list.push(name);
        }
        list.join(',');
        setCookie(cookieName, list, 365);
        return true;
    }
    function updateMode(mode) {
        editor.getSession().setMode('ace/mode/' + mode);
        localStorage.mode = mode;
        document.getElementById('syntax').innerHTML = getKey(localStorage.mode || 'javascript', modes);
    }
    function save(e) {
      localStorage.doc = editor.getValue() || '';
      var cname = location.host.substring(0, location.host.indexOf('.'));
      updateFiles(cname, getFiles());

      return true;
    }





    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/'+ (localStorage.mode || 'javascript'));
    editor.setValue( localStorage.getItem('doc') || '');
    editor.getSession().on('change', save);

    document.getElementById('syntax').innerHTML = getKey(localStorage.mode || 'javascript', modes);


    (function populateDocs() {
        var files = getFiles();
        for (var i = 0; i < files.length; i++) {
            var option =  document.createElement('option');
            option.appendChild( document.createTextNode(files[i]) );
            document.getElementById('files').appendChild(option);
        }    
    })();

    (function populateModes() {

        for (var key in modes) {
            var option =  document.createElement('option');
            option.value = modes[key];
            option.appendChild( document.createTextNode(key) );
            document.getElementById('modes').appendChild(option);
        }    
    })();



    return {
        updateFiles: updateFiles,
        updateMode: updateMode,
        adjustFontSize: adjustFontSize,
        goToCname: goToCname
    };

})(modes || {});



