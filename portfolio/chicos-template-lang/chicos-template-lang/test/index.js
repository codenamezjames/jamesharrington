describe('Sanity test', function() {
  it('should be true', function() {
    expect(true).toBe(true)
  })
})


describe('Parser', function(){
  it('shuold not modify a templatless string', function(){
    expect( chsParser.render('regular string', {}) ).toBe('regular string')
  })
  
  it('should take a string and replace the template strings', function(){
    var templateString = 'stuff ${replaceme} stuff'
    var templates = {replaceme:'replaced!'}
    expect( chsParser.render(templateString, templates) ).toBe('stuff replaced! stuff')
  })
  
  it('should replace a multy line string', function(){
    var templateString = ['stuff', '${multyLineReplace}', 'stuff'].join('\n')
    var templates = {multyLineReplace:'replaced!'}
    var expectedString = ['stuff', 'replaced!', 'stuff'].join('\n')
    expect( chsParser.render(templateString, templates) ).toBe(expectedString)
  })

  it('should replace multiple occurences of the same template', function(){
    var templateString = 'stuff ${replaceme} stuff ${replaceme}'
    var templates = {replaceme:'replaced!'}
    expect( chsParser.render(templateString, templates) ).toBe('stuff replaced! stuff replaced!')
  })

  it('should replace multiple templates', function(){
    var templateString = 'stuff ${replaceme} stuff ${otherReplaceme}'
    var templates = {replaceme:'replaced!', otherReplaceme:'otherReplaced!'}
    expect( chsParser.render(templateString, templates) ).toBe('stuff replaced! stuff otherReplaced!')
  })

  it('should only grab the first word', function(){
    var templateString = '${replaceme otherinfo="stuff"} stuff'
    var templates = { replaceme:'replaced!'}
    expect( chsParser.render(templateString, templates) ).toBe('replaced! stuff')
  })

  // OVERWRITE ANNOTATION
  describe('overwrite', function(){
    it('should allow selectors to replace content in the template', function(){
      var templateString = 'stuff${header overwrite=[#gps::<h1>Doin Real Stuff</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"><h1>replaceme</h1></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><h1>Doin Real Stuff</h1></div>stuff')
    })

    it('should allow any kinda of selectors to replace content in the template', function(){
      var templateString = 'stuff${header overwrite=[div.gps::<h1>Doin Real Stuff</h1>::]}stuff'

      var templates = { header:'<div><div class="gps"><h1>replaceme</h1></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><h1>Doin Real Stuff</h1></div>stuff')
    })

    it('should allow selectors to replace content in the template even when there are multiple', function(){
      var templateString = 'stuff${header overwrite=[#gps::<h1>Doin GPS Stuff</h1>::]}stuff${footer overwrite=[#footer::<h1>Doin Footer Stuff</h1>::]}'

      var templates = { 
        header:'<div><div id="gps"><h1>replaceme</h1></div></div>',
        footer:'<div><div id="footer"><h1>replaceme</h1></div></div>'
    }

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><h1>Doin GPS Stuff</h1></div>stuff<div><h1>Doin Footer Stuff</h1></div>')
    })


    it('should overwrite even when there is crazy templating', function(){
      var templateString = 'stuff${header overwrite=[#gps::<h1 onclick="test ={arr:[]}[this.selectedIndex]">Doin GPS Stuff</h1>::]}stuff${footer overwrite=[#footer::<h1>Doin Footer Stuff</h1>::]}'

      var templates = { 
        header:'<div><div id="gps"><h1>replaceme</h1></div></div>',
        footer:'<div><div id="footer"><h1>replaceme</h1></div></div>'
    }

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><h1 onclick="test ={arr:[]}[this.selectedIndex]">Doin GPS Stuff</h1></div>stuff<div><h1>Doin Footer Stuff</h1></div>')
    })

    it('should remove the template expression if there is no template', function(){
      var templateString = 'stuff${header overwrite=[#gps::<h1>Doin GPS Stuff</h1>::]}stuff${footer}'

      var templates = {}

      expect(chsParser.render(templateString, templates)).toBe('stuff<h1>Doin GPS Stuff</h1>stuff')
    })


    it('should overwrite multiple places', function(){
      var templateString = '${content overwrite=[.overwrite-me1::BOOM1::] overwrite=[.overwrite-me2::BOOM2::]}'

      var templates = {content:'<div><div class="overwrite-me1"></div>mid<div class="overwrite-me2"></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('<div>BOOM1midBOOM2</div>')
    })

    it('should handle spaces and new lines', function(){
      var templateString = '${content\noverwrite=[.overwrite-me1::BOOM1::]\noverwrite=[.overwrite-me2::BOOM2::]}'

      var templates = {content:'<div><div class="overwrite-me1"></div>mid<div class="overwrite-me2"></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('<div>BOOM1midBOOM2</div>')
    })

    it('should throw an error if selector is not found', function(){
      var templateString = 'stuff${header overwrite=[.gps::<h1>Doin Real Stuff</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"><h1>replaceme</h1></div></div>'}

      expect(function(){chsParser.render(templateString, templates)}).toThrow(new Error('Selector `.gps` from template expression `header` not found'));
    })
  })



  // ADD ANOTATION
  describe('append and prepend', function(){
    
    it('should allow selectors to add content in the template using a selector', function(){
      var templateString = 'stuff${header append=[#gps::<h1>Doin Real Stuff</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><div id="gps"><h1>Doin Real Stuff</h1></div></div>stuff')
    })

    it('should allow selectors to prepend content in the template using a selector', function(){
      var templateString = 'stuff${header prepend=[#gps::<h1>Doin Real Stuff</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><div id="gps"><h1>Doin Real Stuff</h1></div></div>stuff')
    })

    it('should allow selectors to append multiple contents in the template', function(){
      var templateString = 'stuff${header append=[#gps::<h1>Doin Real Stuff</h1>::] append=[#gps::<h1>Doin Real Stuff2</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><div id="gps"><h1>Doin Real Stuff</h1><h1>Doin Real Stuff2</h1></div></div>stuff')
    })

    it('should allow selectors to prepend multiple contents in the template', function(){
      var templateString = 'stuff${header prepend=[#gps::<h1>Doin Real Stuff</h1>::] prepend=[#gps::<h1>Doin Real Stuff2</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><div id="gps"><h1>Doin Real Stuff</h1><h1>Doin Real Stuff2</h1></div></div>stuff')
    })

    it('should allow selectors to append multiple contents in the template without overwriting selector children', function(){
      var templateString = 'stuff${header append=[#gps::<h1>Doin Real Stuff</h1>::] append=[#gps::<h1>Doin Real Stuff2</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"><div>Im a child</div></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><div id="gps"><div>Im a child</div><h1>Doin Real Stuff</h1><h1>Doin Real Stuff2</h1></div></div>stuff')
    })

    it('should allow selectors to prepend multiple contents in the template without overwriting selector children', function(){
      var templateString = 'stuff${header prepend=[#gps::<h1>Doin Real Stuff</h1>::] prepend=[#gps::<h1>Doin Real Stuff2</h1>::]}stuff'

      var templates = { header:'<div><div id="gps"><div>Im a child</div></div></div>'}

      expect(chsParser.render(templateString, templates)).toBe('stuff<div><div id="gps"><div>Im a child</div><h1>Doin Real Stuff</h1><h1>Doin Real Stuff2</h1></div></div>stuff')
    })

  })

})

