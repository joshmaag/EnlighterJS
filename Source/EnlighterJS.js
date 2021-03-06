/*
---
name: EnlighterJS
description: Syntax Highlighter based on the famous Lighter.js

license: MIT-style X11 License

authors:
  - Andi Dittrich
  
requires:
  - Core/1.4.5

provides: [EnlighterJS]
...
 */
var EnlighterJS = new Class({

	Implements : Options,

	options : {
		language : 'generic',
		theme : 'Enlighter',
		renderer: 'Block',
		indent : -1,
		forceTheme: false,
		rawButton: false,
		ampersandCleanup: true
	},

	// used renderer instance
	renderer: null,
	
	// used codeblock to highlight
	originalCodeblock: null,
	
	// used container to store highlighted code
	container: null,
	
	// lightning active ?
	isRendered: false,
	
	// language alias manager
	languageManager: null,


	/**
	 * @constructs
	 * @param {Element} originalCodeblock An Element containing code to highlight
	 * @param {Object} options The options object.
	 * @param {Element} container (optional) The output container - if not defined, the output will be injected after the originalCodeblock
	 */
	initialize : function(originalCodeblock, options, container) {
		this.setOptions(options);
		
		// create new language alias manager instance
		this.languageManager = new EnlighterJS.LanguageManager(options);
				
		// initialize renderer
		if (this.options.renderer == 'Inline'){
			this.renderer = new EnlighterJS.Renderer.InlineRenderer(options);
		}else{
			this.renderer = new EnlighterJS.Renderer.BlockRenderer(options);
		}
				
		// store codeblock element
		this.originalCodeblock = document.id(originalCodeblock);
		
		// store/create container
		if (container){
			this.container = document.id(container);
		}
	},

	/**
	 * Takes a codeblock and highlights the code inside of it using the
	 * stored parser/compilers. It reads the class name to figure out what
	 * language and theme to use for highlighting.
	 * 
	 * @return {EnlighterJS} The current EnlighterJS instance.
	 */
	enlight : function(enabled){
		// show highlighted sourcecode ?
		if (enabled){
			// get element language
			var rawLanguageName = this.originalCodeblock.get('data-enlighter-language');
			
			// ignore higlighting ?
			if (rawLanguageName == 'no-highlight'){
				return;
			}
			
			// hide original codeblock
			this.originalCodeblock.setStyle('display', 'none');
			
			// EnlighterJS exists so just toggle display.
			if (this.isRendered) {				
				this.container.setStyle('display', 'inherit');
				return this;
			}
			
			// get language name - use alias manager to check language string and validate
			var languageName = this.languageManager.getLanguage(rawLanguageName);
			
			// get theme name - use options as fallback
			var themeName = (this.options.forceTheme ? null : this.originalCodeblock.get('data-enlighter-theme')) || this.options.theme || 'Enlighter';
			
			// special lines to highlight ?
			var specialLines = new EnlighterJS.SpecialLineHighlighter(this.originalCodeblock.get('data-enlighter-highlight'), this.originalCodeblock.get('data-enlighter-lineoffset'));
			
			// Load language parser
			language = new EnlighterJS.Language[languageName](this.getRawCode(true));
			
			// compile tokens -> generate output
			var output = this.renderer.render(language, specialLines, {
				lineOffset: (this.originalCodeblock.get('data-enlighter-lineoffset') || null),
				lineNumbers: this.originalCodeblock.get('data-enlighter-linenumbers')
			});
			
			// set class and id attributes.
			output.addClass(themeName.toLowerCase() + 'EnlighterJS').addClass('EnlighterJS');		
			output.set('id', 'EnlighterJS_' + String.uniqueID());
	
			// show button toolbar ? add wrapper
			if (this.options.rawButton === true && this.options.renderer == 'Block'){
				// grab content into specific container or after original code block ?
				if (this.container) {
					this.container.grab(output);
				}else{
					this.container = new Element('div');
					
					// add the highlighted code
					this.container.grab(output);
					
					// put the highlighted code wrapper behind the original	
					this.container.inject(this.originalCodeblock, 'after');
				}
				
				// add wrapper class
				this.container.addClass('EnlighterJSWrapper').addClass(themeName.toLowerCase() + 'EnlighterJSWrapper');
				
				// create raw content container
				var rawContentContainer = new Element('pre', {
					text: this.getRawCode(false),
					styles: {
						'display': 'none'
					}
				});
				
				// add raw content container
				this.container.grab(rawContentContainer);
				
				// visibility flag
				var highlightedContainerVisible = true;
				
				// create toggle "button"
				this.container.grab(new Element('div', {
					'class': 'EnlighterJSRawButton',
					events: {
						 click: function(){
							 // toggle raw/highlighted containers
							 if (highlightedContainerVisible){
								 output.setStyle('display', 'none');
								 rawContentContainer.setStyle('display', 'block');
								 highlightedContainerVisible = false;
							 }else{
								 output.setStyle('display', 'block');
								 rawContentContainer.setStyle('display', 'none');
								 highlightedContainerVisible = true;
							 }
						 }
					 }
				}));
			// normal handling
			}else{
				// grab content into specific container or after original code block ?
				if (this.container) {
					this.container.grab(output);
					
				// just put the highlighted code behind the original	
				}else{
					output.inject(this.originalCodeblock, 'after');
					this.container = output;
				}
			}
			
			// set render flag
			this.isRendered = true;
			
		// disable highlighting	
		}else{
			// already highlighted ?
			if (this.isRendered) {
				this.originalCodeblock.setStyle('display', 'inherit');
				this.container.setStyle('display', 'none');
			}
		}

		return this;
	},
	
	/**
	 * Takes a codeblock and highlights the code inside. The original codeblock is set to invisible
	 * @DEPRECATED since v2.0 - this method will be removed in the future
	 * 
	 * @return {EnlighterJS} The current EnlighterJS instance.
	 */
	light : function(){
		return this.enlight(true);
	},
		
	/**
	 * Unlights a codeblock by hiding the enlighter element if present and re-displaying the original code.
	 * @DEPRECATED since v2.0 - this method will be removed in the future
	 * 
	 * @return {EnlighterJS} The current EnlighterJS instance.
	 */
	unlight : function() {
		return this.enlight(false);
	},

	/**
	 * Extracts the raw code from given codeblock
	 * @author Andi Dittrich
	 * @return {String} The plain-text code (raw)
	 */
	getRawCode: function(reindent) {
		// get the raw content - remove leading+trailing whitespaces
		var code = this.originalCodeblock.get('html').trim();
		
		// cleanup ampersand ?
		if (this.options.ampersandCleanup===true){
			code = code.replace(/&amp;/gim, '&');
		}
		
		// replace html escaped chars
		code = code.replace(/&lt;/gim, '<').replace(/&gt;/gim, '>').replace(/&nbsp;/gim, ' ');

		// replace tabs with spaces ?
		if (reindent === true){
			// get indent option value
			var newIndent = this.options.indent.toInt();
			
			// re-indent code if specified
			if (newIndent > -1){
				// match all tabs
				code = code.replace(/(\t*)/gim, function(match, p1, offset, string){
					// replace n tabs with n*newIndent spaces
					return (new Array(newIndent * p1.length + 1)).join(' ');
				});
			}
		}

		return code;
	}
});

// register namespaces
EnlighterJS.Language = {};
EnlighterJS.Renderer = {};
EnlighterJS.Util = {};
EnlighterJS.UI = {};

