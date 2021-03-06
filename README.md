EnlighterJS
===========

EnlighterJS is a free, easy-to-use, syntax highlighting class developed for [MooTools](http://mootools.net "MooTools.net"). It is based on the famous [Lighter.js](https://github.com/pradador/Lighter "Ligher.js").
Using it can be as simple as adding a single script and style to your website, choosing the elements you wish to highlight, and EnlighterJS takes care of the rest.
It also supports the automatic creation of tab-panes to display groups of code together (useful for multi-language examples - e.g. html+css+js)
The Documentation as well as the Theme Demo is available [here](http://enlighterjs.andidittrich.de "EnligherJS Documentation")

![Screenshot](http://enlighterjs.andidittrich.de/screenshot1.png)

Features
--------

* Written in MooTools. Requires version 1.4+
* Build-in support for CSS, HTML, Javascript, XML, Java, Markdown, PHP, Python, Ruby, Shellscript, C++, C, NSIS and SQL
* Easy to use with familiar MooTools syntax.
* Supports code-groups (displays multiple code-blocks within a tab-pane)
* Includes Inline Syntax highlighting
* Extensible language and theme engines - add your own one.
* Simple CSS based themes
* ANT build-script included for easy custom builds
* Small footprint: 50kB js + 12kB css (including ALL build-in languages + themes); GZ Compressed 22kB + 2.7kB
* Point out special lines of code
* Initialization can be performed by adding a simple html meta-tag or using a small piece of javascript

Plugins
-------
* [Enlighter for WordPress](http://wordpress.org/plugins/enlighter/) - The official EnlighterJS plugin for WordPress

How to use
----------
This is a minimalistic example how to highlight sourcecode with EnlighterJS. The working example (correct js+css paths) is available within the EnlighterJS package (Quickstart.html).

    #HTML
    <head>
    ...
    <!-- Include EnlighterJS Styles -->
    <link rel="stylesheet" type="text/css" href="EnlighterJS.yui.css" />
    
    <!-- Include MooTools Framework -->
    <script type="text/javascript" src="mootools-core-1.4.5-full-nocompat.js"></script>
    
    <!-- Include EnlighterJS -->
    <script type="text/javascript" src="EnlighterJS.yui.js" ></script>
    
    <!-- Initialize EnlighterJS -->	
    <meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-indent="4" data-selector-block="pre" data-selector-inline="code.special" />
    ...
    </head>
    <body>
    ...
    <!-- This code will be highlighted as Javascript !-->
    <pre data-enlighter-language="js">
    $('#loading-example-btn').click(function () {
      var btn = $(this)
      btn.button('loading')
      $.ajax(...).always(function () {
        btn.button('reset')
      });
    });
    </pre>
    ...
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <code class="special">window.addEvent('domready', function(){});</code> labore et dolore magna aliquyam erat.</p>
    </body>

Build-in Languages & Themes
---------------------------
The following Themes and Languages are included into the EnlighterJS standard package:

#### Languages ####
List of languages with their corresponding identifiers and supported aliases (wrapped into brackets behind the names)

* **HTML** (html)
* **XML** (xml)
* **Javascript** (js, javascript, jquery, mootools, ext.js)
* **CSS** (css)
* **C** (c)
* **C++** (cpp, c++)
* **Java** (java)
* **Python** (py, python)
* **Ruby** (ruby(
* **Markdown** (md, markdown)
* **PHP** (php)
* **Shellscript** (shell, bash)
* **SQL** (sql)
* **NSIS** (nsis)
* **Generic** (generic, standard) - default highlighting scheme
* **RAW** (raw) - raw code without highlighting with EnlighterJS container styles!
* **No-Highlight** (no-highlight) - disables highlighting and retains your page styles!

#### Themes ####
Theme identifiers are always expressed as lowercase!

* **Enlighter** (enlighter, standard) - the default theme
* **MooTools** (mootools) - MooTools Docs inspired Theme
* **Git** (git)
* **Mocha** (mocha)
* **Panic** (panic)
* **Tutti** (tutti)
* **Twilight** (twilight)

Basic Usage
-----------
Download EnlighterJS and extract the files. You will find some examples located in the *Examples/* directory.
Copy the prebuild files of the *Build/* directory into a web-accessible directory of your choice. 

Link to the EnlighterJS.yui.js javascript file and the EnlighterJS.yui.css stylesheet in the head section of your document **after** the MooTools file. 
The example below assumes you moved the files into your scripts folder under "js/" and your styles folder under "css/". 
The extension .yui indicates that these files are compressed with the [Yahoo YUI Compressor](http://yui.github.io/yuicompressor/). **These files are ready for productive use!** 
If you want to start developing, you should consider to use the uncompressed versions for easier debugging!

Rendering options can be defined as global option (Metainit attributes or options object) or local option using the `data-enlighter-` attributes on each codeblock. It is recommended to use local options only if necessary (e.g. to define a language for each block).

    #HTML
    <head>
    ...
    <!-- Include EnlighterJS Styles -->
    <link rel="stylesheet" type="text/css" href="css/EnlighterJS.yui.css" />
    	 
    <!-- Include MooTools Framework -->
    <script type="text/javascript" src="js/mootools-core-1.4.5-full-nocompat.js"></script>
    
    <!-- Include EnlighterJS -->
    <script type="text/javascript" src="js/EnlighterJS.yui.js" ></script>
    ...
    </head>

Prepare your source code by giving the element (containing the code) an optional *data-enlighter-language* attribute with the language and maybe an optional *data-enlighter-theme* attribute with the theme you want to use. 
**Notice**: Instead of Lighter.js fuel:flame syntax combo within the css classname, EnlighterJS will use HTML5 data- attributes!

    #HTML
    <!-- Syntax highlight using Javascript and default theme -->
    <pre id="myJsCode" data-enlighter-language="js">var myClass = new Class({})</pre>
    
    <!-- Syntax highlight using the Git Theme-->
    <pre class="myPhp" ddata-enlighter-theme="git"><?php php_info() ?></pre>

Finally, use the following JavaScript code examples inside of a 'domready' or 'onload' callback to create the highlighted elements - this process is called initialization.
Be sure to check out the Options section to see the various options you can use. The Example pages have various examples you can use.
It's strongly recommended to use the Element style syntax or the EnlighterJS.Util.Helper class! Further informations are available within the [Initialization Section](#initialization).

    #JS
    // OPTION1 - Element style syntax - get element by it's ID
    document.id('myJsCode').enlight(true);
    	
    // OPTION2 - Element style syntax - highlight all pre elements with the class *myPhp*
    // an EnlighterJS instance is automatically created
    document.getElements('pre.myPhp').enlight({language: php});
    
    // OPTION3 - Use the Helper-Class to highlight all pre elements - this is the recommended way and required to use the Code-Group feature
    EnlighterJS.Util.Helper(document.getElements('pre'), {
    	language: 'javascript',
    	theme: 'git'
    });

Instead of initializing EnlighterJS manually, since version 1.1 it is possible to use a simple html-metatag (called *EnlighterJS Metainit*) to run Enlighter on your page (with basic config options). Further informations are available within the [Initialization Section](#initialization).

    #HTML
    <!-- Initialize EnlighterJS -->	
    <meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-language="standard" data-theme="standard" data-indent="5" data-compiler="List" data-altlines="none" data-selector="pre" />
	
Since version 1.8, it's possible to highlight special lines of code. Just add the attribute `data-enlighter-highlight` to your codeblock and provide a set of lines to mark (ranges supported).

    #HTML
    <!-- just highlight line number 2 !-->
    <pre data-enlighter-language="js" data-enlighter-highlight="2">
    this.tokens = tokens || [];
    options = this.options;
    </pre>
    
    <!-- highlight line 2,3,4 !-->
    <pre data-enlighter-language="js" data-enlighter-highlight="2-4">
    EnlighterJS.Util.Helper(document.getElements('pre'), {
       indent : 5,
       grouping: false
	});
	</pre>

Version 2.0 introduces some amazing features like Inline-Syntax-Highlighting.
Just change the renderer option to 'Inline' - and of course the [Metainit](#metainit_initialization) tool performs this action automatically

    #JS
    // Highlight all code tags and use Javascript as default language
    EnlighterJS.Util.Helper(document.getElements('code'), {
    	language: 'javascript',
    	renderer: 'Inline'
    });

In some cases it might be usefull to start the linnumber counting with another value than 1 (maybe an excerpt). In this case you can add the `data-enlighter-lineoffset` attribute to your codeblock.

    #HTML
    <!-- start linenumber counting with line 15 !-->
    <pre data-enlighter-language="js" data-enlighter-lineoffset="15">
    this.tokens = tokens || [];
    options = this.options;
    </pre>
    
Initialization
--------------
The integration of EnlighterJS requires the following 3 steps:
1. Integrate MooTools.Core, EnlighterJS Script+Styles into your page
2. Prepare your source code elements on your page by adding a language identifier
3. "Initialize" EnlighterJS to highlight the code

Initialization means, that all elements (you wish to highlight) get selected and rendered by EnlighterJS. This task can be performed in two different ways:

### Metainit Initialization ##
Instead of initializing EnlighterJS manually, since version 1.1 it is possible to use a simple html-metatag (called *EnlighterJS Metainit*) to run Enlighter on your page (with basic config options). This will be usefull if you only need a basic setup. Take a look into the examples *Examples/Testcase.Metainit.html* to see how it is working!
Basically Metainit takes the given html attribute options and converts them into a options object. These options will be passed to the `Enlighter.Util.Helper()` utility function - for inline elements (InlineRenderer) identified by `data-selector-inline` as well as block elements (BlockRenderer) by `data-selector-block`.
This will take all the work for you by adding a single line to the head section to use all the amazing EnlighterJS features like Inline-Syntax-Highlighting or CodeGroups!

#### Example ####
Description: It enables block highlighting for all `pre` elements on the page as well as inline highlighting for all `code` elements. Javascript is set as default language used for highlighting. Each tab is replaced by four spaces to avoid rendering issues. Additionally the "raw code button" is enabled which allows the user to toggle between highlighted and unhighlighted code (e.g. to copy code).
    #HTML
    <!-- Initialize EnlighterJS -->	
    <meta name="EnlighterJS" content="Advanced javascript based syntax highlighting" data-indent="4" data-selector-block="pre" data-selector-inline="code" data-rawcodebutton="true" data-language="javascript" />

#### Attributes ####
Following attributes are available (optional) and will be converted to the required options object to trigger `EnlighterJS.Util.Helper`. Take a look into the Metainit.js sources to see how it is working.

* **name** (string) **REQUIRED** - This attribute identifies the metatag and have to be set to "EnlighterJS" (case sensitive)
* **data-language** (string) - Sets the default language of every codeblock (inline+block) on the page - default: **generic**
* **data-theme** (string) - Sets the default theme of every codeblock (inline+block) on the page - default: **enlighter**
* **data-indent** (number) - Number of spaces to replace tabs with (-1 means no replacement) - default: **-1**
* **data-selector-block** (string) - The CSS selector to match all codeblocks for block-highlighting. Use "NULL" to disable block highlighting - default: **pre**
* **data-selector-inline** (string) - The CSS selector to match all codeblocks for inline-highlighting. Use "NULL" to disable inline highlighting - default: **code**
* **data-rawcodebutton** (boolean) - Enables the optional "RAW Code Button" which will appear in ever codeblock (Block Renderer) to switch between highlighted and un-highlighted code - default: **false**
* **data-linenumbers** (boolean) - Display line-numbers in code-blocks (ol/li list used as container) - default: **true**
* **data-hover** (string) -  Defines a css-classname which is added to each line. To enable build-in hover effects set it to "hoverEnabled" (default), *null* to disable it or to any custom class - default: **"hoverEnabled"**

### Javacript based Initialization ###
EnlighterJS provides 3 ways to get manually initialized:

* Use the native `Element.enlight()` method which will automatically creates an EnlighterJS instance of the selected single element
* Create a new instance of `EnlighterJS` and provide the single element to highlight
* To use Code-Groups you have to use `EnlighterJS.Util.Helper` utility function

**Notice:** You can pass any of the [Global Options](#global_options) with each method. Every method will invoke the `EnlighterJS` constructor.

#### Option 1 - Native Element extension ####

    #JS
    // get element by it's ID and activate highlighting using markdown as language
    document.id('myCustomCode').enlight({
      language: 'ruby', 
      indent: 2
    });
    
    // disable highlighting
    document.id('myCustomCode').enlight(false);

#### Option 2 - Use an EnlighterJS instance (OOP Style) ####

    #JS
    // create a new EnlighterJS instance
    var myEnlighter = new EnlighterJS(document.id('myCustomCode'), {
      language: 'php',
      showLinenumbers: false
    });
    
    // enable highlighting
    myEnlighter.enlight(true);

#### Option 3 - Use an EnlighterJS.Util.Helper utility function ####

    #JS
    // Highlight all code tags (inline code) and use Javascript as default language
    EnlighterJS.Util.Helper(document.getElements('code'), {
    	language: 'javascript',
    	renderer: 'Inline'
    });

Global Options
--------------
The following options can be passed to the following methods to customize the rendering behaviour:
* `EnlighterJS(codeblockElement, options = {}, container = null)` constructor
* `EnlighterJS.Util.Helper(elements, options = {})` utility function 

#### Option Keys ####
* **language** - (string) The default language used if no `data-enlighter-language` attibutes are used - default: **"generic"**
* **theme** - (string) The default theme used if no `data-enlighter-theme` attibutes are used - default: **"enlighter"**
* **indent** - (integer) Number of spaces to replace tabs with (-1 means no replacement) - default: **-1**
* **hover** - (string) Defines a css-classname which is added to each line. To enable build-in hover effects set it to "hoverEnabled" (default), *null* to disable it or to any custom class - default: **"hoverEnabled"**
* **oddClassname** - (string) CSS-classname of all odd lines - default: **"odd"**
* **evenClassname** - (string) CSS-classname of all even lines - default: **"even"**
* **showLinenumbers** - (boolean) Display line-numbers in code-blocks (ol/li list used as container) - default: **true**
* **forceTheme** - (boolean) Forces the renderer to use ignore attribute theme setting `data-enlighter-theme` - default: **false**
* **renderer** - (string) Defines the renderer used to generate the output. Use `Inline` for Inline-Syntax-Highlighting or `Block` for standard highlighting - default: **Block**
* **rawButton** - (boolean) Enables the optional "RAW Code Button" which will appear in ever codeblock (Block Renderer) to switch between highlighted and un-highlighted code - default: **false**
* **grouping** - (boolean) Enables code-groups (only used by `EnlighterJS.Util.Helper` utility) - default: **true**
* **inlineContainerTag** - (string) The html tag-name of the container (inline-syntax-highlighting only) where the generated code is wrapped into - default: **"span"**
* **ampersandCleanup** - (boolean) Should the ampersand escape sequence `&#38;amp;` automatically replaced by the ampersand sign during code cleanup ? Useful to resolve double escaped html code - default: **true**

#### Example ####

    #JS
    var options = {
    	language : 'javascript',
    	theme : 'MooTools',
    	indent : 4,
    	forceTheme: false,
    	rawButton: true,
    	showLinenumbers: false,
    	renderer: 'Inline'
    };
    
    // Initialize EnlighterJS
    EnlighterJS.Util.Helper(document.getElements('code'), options);

Element Options
---------------
Some options need to be applied directly to the container elements which holds the code to highlight. These "local" options will override all global options which are set.

* **data-enlighter-language** (string) - The language of the codeblock - overrides the global default setting | Block+Inline Content option
* **data-enlighter-theme** (string) - The theme of the codeblock - overrides the global default setting | Block+Inline Content option
* **data-enlighter-group** (string) - The identifier of the codegroup where the codeblock belongs to | Block Content option
* **data-enlighter-title** (string) - The title/name of the tab | Block Content option
* **data-enlighter-linenumbers** (boolean) - Show/Hide the linenumbers of a codeblock (Values: "true", "false") | Block Content option
* **data-enlighter-highlight** (string) - A List of lines to point out, comma seperated (ranges are supported) e.g. "2,3,6-10" | Block Content option
* **data-enlighter-lineoffset** (number) - Start value of line-numbering e.g. "5" to start with line 5 - attribute `start` of the ol tag is set | Block Content option

#### Example 1 ####

    #HTML
    <pre data-enlighter-language="js" data-enlighter-linenumbers="false" data-enlighter-lineoffset="5">
    ...
    </pre>

#### Example 2 ####

    #HTML
    <p>
    EnlighterJS also supports <code class="special" data-enlighter-language="js">alert('Inline Sourcecode highlighting');</code> (since version 2.0).
    </p>

Code-Groups
-----------

This example shows how to use code-groups. You can define a new code-group by adding a `data-enlighter-group` attribute to your code tags you want to group. The value is used as an internal identifier and is not shown anywhere (e.g. use numerical identifiers).
The name/title of the tab is defined by a `data-enlighter-title` attribute. To use a corporate style within all code-blocks grouped together, the theme definition of the first code-block defined in your document (the group leader) is used as theme of the complete group - other theme definitions will be ignored. if no theme is specified, the default theme (defined in the options) will be used, which is recommended.

#### Define a Code-Group ####

    #HTML
    <!-- the following 3 code-blocks will be grouped togehter - the theme will be "enlighter" (global theme definition of the group-leader) !-->
    <pre data-enlighter-language="js" data-enlighter-group="group0001" data-enlighter-title="Javascript">
    this.tokens = tokens || [];
    options = this.options;
    </pre>
    
    <!-- Theme definition will be ignored !-->
    <pre data-enlighter-language="java" data-enlighter-theme="panic" data-enlighter-group="group0001" data-enlighter-title="pure Java">
    import javax.swing.JOptionPane;
    
    public class OddEven {
    /**
     * "input" is the number that the user gives to the computer
     */
    private int input; // a whole number("int" means integer)
    </pre>
    
    <!-- Theme definition will be ignored !-->
    <pre data-enlighter-language="php" data-enlighter-theme="twilight" data-enlighter-group="group0001" data-enlighter-title="PHP Script">
    /** Test Snippet */
    $mysqli = new mysqli("localhost", "my_user", "my_password", "world");
       
    /* check connection */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }
    </pre>
	
#### Initialize Code-Groups ####
The initialization of code-groups differs from the standard. You have to use the `EnlighterJS.Util.Helper` utility function - it does the complete initialization and grouping for you!
Finally, use the following JavaScript code inside of a `domready` or `onload` event to create the highlighted elements. 
Check out the options section to see the various options you can use. 

**Notice:** The **Metainit** initialization method also triggers the `EnlighterJS.Util.Helper` utility with **enabled** grouping!

    #JS
    // highlight all pre tags
    EnlighterJS.Util.Helper(document.getElements('pre'), {
        indent: 4,
        language: 'js',
        theme: 'enlighter',
        grouping: true,
        rawButton: true
    });
	
Custom Builds
-------------
To save bandwith/traffic or include self-defined languages, you can easily customize your EnlighterJS build by editing the *build.xml* file (found in the root directory) and run Apache ANT Build (target *build*)
If you want to remove some of the default theme you can edit the *include.themes* property and modify the list of css source files.
For Example: only include the Git and Mocha themes

    #XML
    <!-- Themes to include !-->
    <property name="include.themes" value="Source/Themes/Git.css Source/Themes/Mocha.css" />

Or Include only your custom themes

    #XML
    <!-- Themes to include !-->
    <property name="include.themes" value="Source/Themes/Custom1.css Source/Themes/Custom2.css" />		
		
Removing/Adding languages is also easy as this - they are defined by the *include.languages* property.
For Example: only include html+css+js syntax highlighting (be carefull - html is an alias for XML!, you have to include `Xml.js`)

    #XML
    <!-- Languages to include !-->
    <property name="include.languages" value="Source/Languages/Css.js Source/Languages/Xml.js Source/Languages/Js.js" />
		

Compatibility
-------------

All browsers supported by MooTools and with HTML5 capabilities for "data-" attributes are compatible with EnlighterJS.
It's possible that it may work with earlier/other browsers.

* Chrome 10+
* Safari 5+
* Internet Explorer 6+
* Firefox 2+
* Opera 9+


Screenshots
-----------

![Screenshot 1](http://enlighterjs.andidittrich.de/screenshot1.png)
![Screenshot 2](http://enlighterjs.andidittrich.de/screenshot2.png)    


License
-------

EnlighterJS is licensed under [The MIT License (X11)](http://opensource.org/licenses/MIT)
