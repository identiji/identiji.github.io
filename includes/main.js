var btn_generate = document.getElementById("button-generate");
var btn_copy = document.getElementById("button-copy");

var btn_obscure = document.getElementById("button-obscure");
var btn_show = document.getElementById("button-show");

const CHAR_ASTERISK = "*";
const DEFAULT_OUTPUT_STRING = "Result will show up here";

var output_div;
var output_txt;
var output_txt_obscured;
var input_field;
var input_txt;
var input_txt_obscured;

var obscure_on = false;
var show_on = true;

btn_generate.addEventListener("click", generateResult);
btn_copy.addEventListener("click", copyResult);

btn_obscure.addEventListener("click", obscureFields);
btn_show.addEventListener("click", showFields);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function scrollToSectionTop()
{
	//window.scrollTo(0, 500);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





function includeHTML_guide()
{
	var z, i, elmnt, file, xhttp;

	// Loop through a collection of all HTML elements
	z = document.getElementsByTagName("*");

	for (i = 0; i < z.length; i++)
	{
		elmnt = z[i];

		// Search for elements with a certain atrribute
		file = elmnt.getAttribute("include-html-guide");

		if (file)
		{
			// Make an HTTP request using the attribute value as the file name
			xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4)
				{
				  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
				  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}

				  // Remove the attribute, and call this function once more
				  elmnt.removeAttribute("include-html-guide");
				  includeHTML_guide();
				}
			}

			xhttp.open("GET", file, true);
			xhttp.send();

			// Exit the function
			return;
		}
	}
}



function includeHTML_faq()
{
	var z, i, elmnt, file, xhttp;

	// Loop through a collection of all HTML elements
	z = document.getElementsByTagName("*");

	for (i = 0; i < z.length; i++)
	{
		elmnt = z[i];

		// Search for elements with a certain atrribute
		file = elmnt.getAttribute("include-html-faq");

		if (file)
		{
			// Make an HTTP request using the attribute value as the file name
			xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4)
				{
				  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
				  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}

				  // Remove the attribute, and call this function once more
				  elmnt.removeAttribute("include-html-faq");
				  includeHTML_faq();
				}
			}

			xhttp.open("GET", file, true);
			xhttp.send();

			// Exit the function
			return;
		}
	}
}



function includeHTML_verified()
{
	var z, i, elmnt, file, xhttp;

	// Loop through a collection of all HTML elements
	z = document.getElementsByTagName("*");

	for (i = 0; i < z.length; i++)
	{
		elmnt = z[i];

		// Search for elements with a certain atrribute
		file = elmnt.getAttribute("include-html-verified");

		if (file)
		{
			// Make an HTTP request using the attribute value as the file name
			xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4)
				{
				  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
				  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}

				  // Remove the attribute, and call this function once more
				  elmnt.removeAttribute("include-html-verified");
				  includeHTML_verified();
				}
			}

			xhttp.open("GET", file, true);
			xhttp.send();

			// Exit the function
			return;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function generateResult()
{
	var in_curr = document.getElementById( "input-emoji-string" );
	var out_curr = document.getElementById( "output-string" );
	var in_txt_curr = in_curr.value;
	var out_txt_curr = out_curr.innerHTML;

	var txt_result = "";

	// Proceed only if input field isn't empty
	if (in_txt_curr != "")
	{
		// Input string has already been masked
		if ( isObscured(in_txt_curr) )
		{
			// Use backed up value
			txt_result = emoji_string_to_text_string( input_txt );
		}
		else
		{
			// Use current input field
			txt_result = emoji_string_to_text_string( in_txt_curr );

			// Now mask input field as well if obscure mode is on
			if (obscure_on)
			{
				// Back up input
				input_txt = in_txt_curr;

				input_txt_obscured = maskString( in_txt_curr );

				in_curr.value = input_txt_obscured;
			}
		}

		// Mask output if obscure mode is on
		if (obscure_on)
		{
			// Back up output
			output_txt = txt_result;

			output_txt_obscured = maskString( txt_result );

			txt_result = output_txt_obscured;
		}

		out_curr.innerHTML = txt_result;
	}
}

function copyResult()
{
	//console.log("copy button clicked");

	var out_curr = document.getElementById( "output-string" );
	var out_txt_curr = out_curr.innerHTML;

	var txt_result = "";

	// Proceed only if output isn't empty nor of the default value
	if (out_txt_curr != "" && out_txt_curr != null && out_txt_curr != DEFAULT_OUTPUT_STRING)
	{
		// Output string has already been masked
		if ( isObscured(out_txt_curr) )
		{
			// Use backed up value
			txt_result = output_txt;
		}
		else
		{
			// Use current output field
			txt_result = out_txt_curr;
		}

		navigator.clipboard.writeText( txt_result ).then(function() {
		    window.alert("Copied to clipboard");
		}, function() {
		    window.alert("Failed to copy to clipboard.");
		});
	}

	// Do nothing if there is no valid result
}


function resetOutput()
{
	var out_curr = document.getElementById( "output-string" );

	output_txt = "";
	output_txt_obscured = "";

	out_curr.innerHTML = DEFAULT_OUTPUT_STRING;

	// Clear input cache
	input_txt = "";
	input_txt_obscured = "";
}


function obscureFields()
{
	//console.log("obscure button clicked");

	obscure_on = true;
	show_on = false;

	var in_curr = document.getElementById( "input-emoji-string" );
	var out_curr = document.getElementById( "output-string" );
	var in_txt_curr = in_curr.value;
	var out_txt_curr = out_curr.innerHTML;

	if (isObscured( in_txt_curr ) || in_txt_curr == null || in_txt_curr == "")
	{
		// String already obscured or empty. Do nothing.
	}
	else
	{
		// Back up
		input_field = document.getElementById( "input-emoji-string" );

		input_txt = input_field.value;

		// Mask
		input_txt_obscured = maskString( input_txt );

		//console.log("masked input: " + input_txt_obscured);

		// Update element
		input_field.value = input_txt_obscured;
	}

	if (isObscured( out_txt_curr ) || out_txt_curr == DEFAULT_OUTPUT_STRING)
	{
		// String is already obscured or of default value. Do nothing.
	}
	else
	{
		// Back up
		output_div = document.getElementById( "output-string" );

		output_txt = output_div.innerHTML;

		// Mask
		output_txt_obscured = maskString( output_txt );

		//console.log("masked output: " + output_txt_obscured);

		// Update element
		output_div.innerHTML = output_txt_obscured;
	}
}


function showFields()
{
	//console.log("show button clicked");

	obscure_on = false;
	show_on = true;

	var in_curr = document.getElementById( "input-emoji-string" );
	var out_curr = document.getElementById( "output-string" );
	var in_txt_curr = in_curr.value;
	var out_txt_curr = out_curr.innerHTML;

	if (isObscured( in_txt_curr ) == false)
	{
		// String not obscured. Do nothing.
	}
	else
	{
		input_field = document.getElementById( "input-emoji-string" );

		// Update element
		input_field.value = input_txt;
	}

	if (isObscured( out_txt_curr ) == false)
	{
		// String not obscured. Do nothing.
	}
	else
	{
		output_div = document.getElementById( "output-string" );

		// Update element
		output_div.innerHTML = output_txt;
	}
}


function isObscured( input )
{
	if (!input || input == "")
	{
		//console.log("is obscured? empty string");
		return false;
	}

	var len = input.length;

	for (var i = 0; i < len; i++)
	{
		if (input[i] != CHAR_ASTERISK)
		{
			//console.log("is obscured? non asterisk found");
			return false;
		}
	}

	return true;
}


function maskString( input )
{
	if (!input || input == "")
	{
		//console.log("mask string: empty string");

		return "";
	}

	var len = input.length;

	var output = "";

	for (var i = 0; i < len; i++)
	{
		//console.log("mask string: next character");
		output += CHAR_ASTERISK;
	}

	return output;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function get_fully_qualified_unicode(matched_unicode)
{
    // loop through the emoji_array
    for (var index = 0; index < emoji_array.length; index++)
    {
        // to see if the matched_unicode exist in emoji_array
        if (emoji_array[index]["unicode"].replace(/\s/g, '').toLowerCase() === matched_unicode)
        {
            //console.log("matched")

            // the matched_unicode is in fully-qualified state
            if (emoji_array[index]["state"] === "fully-qualified")
            {
                //console.log("directly qualified");
                //console.log('before return: ' + (emoji_array[index]["unicode"]).replace(/\s/g, ''));
                return emoji_array[index]["unicode"].replace(/\s/g, '').toLowerCase();
                // the matched_unicode is not is fully-qualified state, find for the fully-qualified unicode for that emoji
            }
            else
            {
                //console.log("finding qualified");

                for (var new_index = index - 1; new_index >= 0; new_index--)
                {
                    if (emoji_array[new_index]["description"] === emoji_array[index]["description"] && emoji_array[new_index]["state"] === "fully-qualified")
                    {
                        //console.log('before return: ' + (emoji_array[new_index]["unicode"]).replace(/\s/g, ''));
                        return emoji_array[new_index]["unicode"].replace(/\s/g, '').toLowerCase();
                    }
                }
            }
        }
    }
}

function get_emoji_unicode(emoji)
{
    return emoji.replace(rex_forall, match => `${match.codePointAt(0).toString(16)}`);
}


function emoji_string_to_text_string(text)
{
    // document.getElementById('test').innerHTML = text.length;

    // return text.replace(rex, match => `${match.codePointAt(0).toString(16)}`);

    // return text.replace(first, get_fully_qualified_unicode);

    // return text.replace(rex, get_fully_qualified_unicode);

    // extract all the emoji from the text
    matched_emoji = text.match(rex);
    matched_unicode = [];
    var new_text = text;

    if (matched_emoji != null)
    {
        // log out the extracted emoji for testing
        for (var i = 0; i < matched_emoji.length; i++)
        {
            //console.log(matched_emoji[i])
        }

        // get the unicode of the emoji one by one from the match return
        for (var index = 0; index < matched_emoji.length; index++)
        {
            matched_unicode[index] = get_emoji_unicode(matched_emoji[index]);
        }

        for (var index = 0; index < matched_unicode.length; index++)
        {
            //console.log('matched unicode: ' + matched_unicode[index])
        }

        // replace the emoji with the fully-qualified unicode one by one
        for (var i = 0; i < matched_emoji.length; i++)
        {
            // new_text.replace(matched_emoji[i], get_fully_qualified_unicode(matched_unicode[i]));
            new_text = new_text.replace(matched_emoji[i], get_fully_qualified_unicode(matched_unicode[i]));
            //console.log(text);
        }
    }

    return new_text;
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function() {

	var	on = addEventListener,
		$ = function(q) { return document.querySelector(q) },
		$$ = function(q) { return document.querySelectorAll(q) },
		$body = document.body,
		$inner = $('.inner'),
		client = (function() {

			var o = {
					browser: 'other',
					browserVersion: 0,
					os: 'other',
					osVersion: 0,
					mobile: false,
					canUse: null
				},
				ua = navigator.userAgent,
				a, i;

			// browser, browserVersion.
				a = [
					['firefox',		/Firefox\/([0-9\.]+)/],
					['edge',		/Edge\/([0-9\.]+)/],
					['safari',		/Version\/([0-9\.]+).+Safari/],
					['chrome',		/Chrome\/([0-9\.]+)/],
					['chrome',		/CriOS\/([0-9\.]+)/],
					['ie',			/Trident\/.+rv:([0-9]+)/]
				];

				for (i=0; i < a.length; i++) {

					if (ua.match(a[i][1])) {

						o.browser = a[i][0];
						o.browserVersion = parseFloat(RegExp.$1);

						break;

					}

				}

			// os, osVersion.
				a = [
					['ios',			/([0-9_]+) like Mac OS X/,			function(v) { return v.replace('_', '.').replace('_', ''); }],
					['ios',			/CPU like Mac OS X/,				function(v) { return 0 }],
					['ios',			/iPad; CPU/,						function(v) { return 0 }],
					['android',		/Android ([0-9\.]+)/,				null],
					['mac',			/Macintosh.+Mac OS X ([0-9_]+)/,	function(v) { return v.replace('_', '.').replace('_', ''); }],
					['windows',		/Windows NT ([0-9\.]+)/,			null],
					['undefined',	/Undefined/,						null],
				];

				for (i=0; i < a.length; i++) {

					if (ua.match(a[i][1])) {

						o.os = a[i][0];
						o.osVersion = parseFloat( a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1 );

						break;

					}

				}

				// Hack: Detect iPads running iPadOS.
					if (o.os == 'mac'
					&&	('ontouchstart' in window)
					&&	(

						// 12.9"
							(screen.width == 1024 && screen.height == 1366)
						// 10.2"
							||	(screen.width == 834 && screen.height == 1112)
						// 9.7"
							||	(screen.width == 810 && screen.height == 1080)
						// Legacy
							||	(screen.width == 768 && screen.height == 1024)

					))
						o.os = 'ios';

			// mobile.
				o.mobile = (o.os == 'android' || o.os == 'ios');

			// canUse.
				var _canUse = document.createElement('div');

				o.canUse = function(p) {

					var e = _canUse.style,
						up = p.charAt(0).toUpperCase() + p.slice(1);

					return	(
								p in e
							||	('Moz' + up) in e
							||	('Webkit' + up) in e
							||	('O' + up) in e
							||	('ms' + up) in e
					);

				};

			return o;

		}()),
		trigger = function(t) {

			if (client.browser == 'ie') {

				var e = document.createEvent('Event');
				e.initEvent(t, false, true);
				dispatchEvent(e);

			}
			else
				dispatchEvent(new Event(t));

		},
		cssRules = function(selectorText) {

			var ss = document.styleSheets,
				a = [],
				f = function(s) {

					var r = s.cssRules,
						i;

					for (i=0; i < r.length; i++) {

						if (r[i] instanceof CSSMediaRule && matchMedia(r[i].conditionText).matches)
							(f)(r[i]);
						else if (r[i] instanceof CSSStyleRule && r[i].selectorText == selectorText)
							a.push(r[i]);

					}

				},
				x, i;

			for (i=0; i < ss.length; i++)
				f(ss[i]);

			return a;

		},
		thisHash = function() {

			var h = location.hash ? location.hash.substring(1) : null,
				a;

			// Null? Bail.
				if (!h)
					return null;

			// Query string? Move before hash.
				if (h.match(/\?/)) {

					// Split from hash.
						a = h.split('?');
						h = a[0];

					// Update hash.
						history.replaceState(undefined, undefined, '#' + h);

					// Update search.
						window.location.search = a[1];

				}

			// Prefix with "x" if not a letter.
				if (h.length > 0
				&&	!h.match(/^[a-zA-Z]/))
					h = 'x' + h;

			// Convert to lowercase.
				if (typeof h == 'string')
					h = h.toLowerCase();

			return h;

		},
		scrollToElement = function(e, style, duration) {

			var y, cy, dy,
				start, easing, offset, f;

			// Element.

				// No element? Assume top of page.
					if (!e)
						y = 0;

				// Otherwise ...
					else {

						offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize);

						switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') {

							case 'default':
							default:

								y = e.offsetTop + offset;

								break;

							case 'center':

								if (e.offsetHeight < window.innerHeight)
									y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset;
								else
									y = e.offsetTop - offset;

								break;

							case 'previous':

								if (e.previousElementSibling)
									y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset;
								else
									y = e.offsetTop + offset;

								break;

						}

					}

			// Style.
				if (!style)
					style = 'smooth';

			// Duration.
				if (!duration)
					duration = 750;

			// Instant? Just scroll.
				if (style == 'instant') {

					window.scrollTo(0, y);
					return;

				}

			// Get start, current Y.
				start = Date.now();
				cy = window.scrollY;
				dy = y - cy;

			// Set easing.
				switch (style) {

					case 'linear':
						easing = function (t) { return t };
						break;

					case 'smooth':
						easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
						break;

				}

			// Scroll.
				f = function() {

					var t = Date.now() - start;

					// Hit duration? Scroll to y and finish.
						if (t >= duration)
							window.scroll(0, y);

					// Otherwise ...
						else {

							// Scroll.
								window.scroll(0, cy + (dy * easing(t / duration)));

							// Repeat.
								requestAnimationFrame(f);

						}

				};

				f();

		},
		scrollToTop = function() {

			// Scroll to top.
				scrollToElement(null);

		},
		loadElements = function(parent) {

			var a, e, x, i;

			// IFRAMEs.

				// Get list of unloaded IFRAMEs.
					a = parent.querySelectorAll('iframe[data-src]:not([data-src=""])');

				// Step through list.
					for (i=0; i < a.length; i++) {

						// Load.
							a[i].src = a[i].dataset.src;

						// Mark as loaded.
							a[i].dataset.src = "";

					}

			// Video.

				// Get list of videos (autoplay).
					a = parent.querySelectorAll('video[autoplay]');

				// Step through list.
					for (i=0; i < a.length; i++) {

						// Play if paused.
							if (a[i].paused)
								a[i].play();

					}

			// Autofocus.

				// Get first element with data-autofocus attribute.
					e = parent.querySelector('[data-autofocus="1"]');

				// Determine type.
					x = e ? e.tagName : null;

					switch (x) {

						case 'FORM':

							// Get first input.
								e = e.querySelector('.field input, .field select, .field textarea');

							// Found? Focus.
								if (e)
									e.focus();

							break;

						default:
							break;

					}

		},
		unloadElements = function(parent) {

			var a, e, x, i;

			// IFRAMEs.

				// Get list of loaded IFRAMEs.
					a = parent.querySelectorAll('iframe[data-src=""]');

				// Step through list.
					for (i=0; i < a.length; i++) {

						// Don't unload? Skip.
							if (a[i].dataset.srcUnload === '0')
								continue;

						// Mark as unloaded.
							a[i].dataset.src = a[i].src;

						// Unload.
							a[i].src = '';

					}

			// Video.

				// Get list of videos.
					a = parent.querySelectorAll('video');

				// Step through list.
					for (i=0; i < a.length; i++) {

						// Pause if playing.
							if (!a[i].paused)
								a[i].pause();

					}

			// Autofocus.

				// Get focused element.
					e = $(':focus');

				// Found? Blur.
					if (e)
						e.blur();


		};

		// Expose scrollToElement.
			window._scrollToTop = scrollToTop;

	// Animation.
		on('load', function() {
			setTimeout(function() {
				$body.className = $body.className.replace(/\bis-loading\b/, 'is-playing');

				setTimeout(function() {
					$body.className = $body.className.replace(/\bis-playing\b/, 'is-ready');
				}, 2000);
			}, 100);
		});

	// Sections.
		(function() {

			var initialSection, initialScrollPoint, initialId,
				header, footer, name, hideHeader, hideFooter, disableAutoScroll,
				h, e, ee, k,
				locked = false,
				doNext = function() {

					var section;

					section = $('#main > .inner > section.active').nextElementSibling;

					if (!section || section.tagName != 'SECTION')
						return;

					location.href = '#' + section.id.replace(/-section$/, '');

				},
				doPrevious = function() {

					var section;

					section = $('#main > .inner > section.active').previousElementSibling;

					if (!section || section.tagName != 'SECTION')
						return;

					location.href = '#' + (section.matches(':first-child') ? '' : section.id.replace(/-section$/, ''));

				},
				doFirst = function() {

					var section;

					section = $('#main > .inner > section:first-of-type');

					if (!section || section.tagName != 'SECTION')
						return;

					location.href = '#' + section.id.replace(/-section$/, '');

				},
				doLast = function() {

					var section;

					section = $('#main > .inner > section:last-of-type');

					if (!section || section.tagName != 'SECTION')
						return;

					location.href = '#' + section.id.replace(/-section$/, '');

				},
				doEvent = function(id, type) {

					var name = id.split(/-[a-z]+$/)[0], i;

					if (name in sections
					&&	'events' in sections[name]
					&&	type in sections[name].events)
						for (i in sections[name].events[type])
							(sections[name].events[type][i])();

				},
				sections = {
					// 'test': {
					// 	disableAutoScroll: true,
					// 	events: {
					// 		onopen: [
					// 			function() {
					// 				gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#test' });
					// 			},
					// 		],
					// 	},
					// },
					'guide': {
						disableAutoScroll: false,
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#guide' });
								},
							],
						},
					},
					'why': {
						disableAutoScroll: false,
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#why' });
								},
							],
						},
					},
					'tips': {
						disableAutoScroll: false,
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#tips' });
								},
							],
						},
					},
					'faq': {
						disableAutoScroll: false,
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#faq' });
								},
							],
						},
					},
					'verified': {
						disableAutoScroll: false,
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#verified' });
								},
							],
						},
					},
					'contact': {
						disableAutoScroll: false,
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#contact' });
								},
							],
						},
					},
					// 'beta': {
					// 	disableAutoScroll: true,
					// 	events: {
					// 		onopen: [
					// 			function() {
					// 				gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/#beta' });
					// 			},
					// 		],
					// 	},
					// },
					'home': {
						events: {
							onopen: [
								function() {
									gtag('config', 'G-L2NRQYS4PH', { 'page_path': '/' });
								},
							],
						},
					},
				};

			// Expose doNext, doPrevious, doFirst, doLast.
				window._next = doNext;
				window._previous = doPrevious;
				window._first = doFirst;
				window._last = doLast;

			// Override exposed scrollToTop.
				window._scrollToTop = function() {

					var section, id;

					// Scroll to top.
						scrollToElement(null);

					// Section active?
						if (!!(section = $('section.active'))) {

							// Get name.
								id = section.id.replace(/-section$/, '');

								// Index section? Clear.
									if (id == 'home')
										id = '';

							// Reset hash to section name (via new state).
								history.pushState(null, null, '#' + id);

						}

				};

			// Initialize.

				// Set scroll restoration to manual.
					if ('scrollRestoration' in history)
						history.scrollRestoration = 'manual';

				// Header, footer.
					header = $('#header');
					footer = $('#footer');

				// Show initial section.

					// Determine target.
						h = thisHash();

						// Contains invalid characters? Might be a third-party hashbang, so ignore it.
							if (h
							&&	!h.match(/^[a-zA-Z0-9\-]+$/))
								h = null;

						// Scroll point.
							if (e = $('[data-scroll-id="' + h + '"]')) {

								initialScrollPoint = e;
								initialSection = initialScrollPoint.parentElement;
								initialId = initialSection.id;

							}

						// Section.
							else if (e = $('#' + (h ? h : 'home') + '-section')) {

								initialScrollPoint = null;
								initialSection = e;
								initialId = initialSection.id;

							}

						// Missing initial section?
							if (!initialSection) {

								// Default to index.
									initialScrollPoint = null;
									initialSection = $('#' + 'home' + '-section');
									initialId = initialSection.id;

								// Clear index URL hash.
									history.replaceState(undefined, undefined, '#');

							}

					// Get options.
						name = (h ? h : 'home');
						hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false;
						hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false;
						disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;

					// Deactivate all sections (except initial).

						// Initially hide header and/or footer (if necessary).

							// Header.
								if (header && hideHeader) {

									header.classList.add('hidden');
									header.style.display = 'none';

								}

							// Footer.
								if (footer && hideFooter) {

									footer.classList.add('hidden');
									footer.style.display = 'none';

								}

						// Deactivate.
							ee = $$('#main > .inner > section:not([id="' + initialId + '"])');

							for (k = 0; k < ee.length; k++) {

								ee[k].className = 'inactive';
								ee[k].style.display = 'none';

							}

					// Activate initial section.
						initialSection.classList.add('active');

						// Event: On Open.
							doEvent(initialId, 'onopen');

					// Load elements.
						loadElements(initialSection);

						if (header)
							loadElements(header);

						if (footer)
							loadElements(footer);

					// Scroll to top (if not disabled for this section).
						if (!disableAutoScroll)
							scrollToElement(null, 'instant');

				// Load event.
					on('load', function() {

						// Scroll to initial scroll point (if applicable).
					 		if (initialScrollPoint)
								scrollToElement(initialScrollPoint, 'instant');

					});

			// Hashchange event.
				on('hashchange', function(event) {

					var section, scrollPoint, id, sectionHeight, currentSection, currentSectionHeight,
						name, hideHeader, hideFooter, disableAutoScroll,
						h, e, ee, k;

					// Lock.
						if (locked)
							return false;

					// Determine target.
						h = thisHash();

						// Contains invalid characters? Might be a third-party hashbang, so ignore it.
							if (h
							&&	!h.match(/^[a-zA-Z0-9\-]+$/))
								return false;

						// Scroll point.
							if (e = $('[data-scroll-id="' + h + '"]')) {

								scrollPoint = e;
								section = scrollPoint.parentElement;
								id = section.id;

							}

						// Section.
							else if (e = $('#' + (h ? h : 'home') + '-section')) {

								scrollPoint = null;
								section = e;
								id = section.id;

							}

						// Anything else.
							else {

								// Default to index.
									scrollPoint = null;
									section = $('#' + 'home' + '-section');
									id = section.id;

								// Clear index URL hash.
									history.replaceState(undefined, undefined, '#');

							}

					// No section? Bail.
						if (!section)
							return false;

					// Section already active?
						if (!section.classList.contains('inactive')) {

							// Get options.
								name = (section ? section.id.replace(/-section$/, '') : null);
								disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;

						 	// Scroll to scroll point (if applicable).
						 		if (scrollPoint)
									scrollToElement(scrollPoint);

							// Otherwise, just scroll to top (if not disabled for this section).
								else if (!disableAutoScroll)
									scrollToElement(null);

							// Bail.
								return false;

						}

					// Otherwise, activate it.
						else {

							// Lock.
								locked = true;

							// Clear index URL hash.
								if (location.hash == '#home')
									history.replaceState(null, null, '#');

							// Get options.
								name = (section ? section.id.replace(/-section$/, '') : null);
								hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false;
								hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false;
								disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;

							// Deactivate current section.

								// Hide header and/or footer (if necessary).

									// Header.
										if (header && hideHeader) {

											header.classList.add('hidden');
											header.style.display = 'none';

										}

									// Footer.
										if (footer && hideFooter) {

											footer.classList.add('hidden');
											footer.style.display = 'none';

										}

								// Deactivate.
									currentSection = $('#main > .inner > section:not(.inactive)');
									currentSection.classList.add('inactive');
									currentSection.classList.remove('active');
									currentSection.style.display = 'none';

								// Unload elements.
									unloadElements(currentSection);

								// Event: On Close.
									doEvent(currentSection.id, 'onclose');

							// Activate target section.

								// Show header and/or footer (if necessary).

									// Header.
										if (header && !hideHeader) {

											header.style.display = '';
											header.classList.remove('hidden');

										}

									// Footer.
										if (footer && !hideFooter) {

											footer.style.display = '';
											footer.classList.remove('hidden');

										}

								// Activate.
									section.classList.remove('inactive');
									section.classList.add('active');
									section.style.display = '';

								// Event: On Open.
									doEvent(section.id, 'onopen');

							// Trigger 'resize' event.
								trigger('resize');

							// Load elements.
								loadElements(section);

							// Scroll to scroll point (if applicable).
								if (scrollPoint)
									scrollToElement(scrollPoint, 'instant');

							// Otherwise, just scroll to top (if not disabled for this section).
								else if (!disableAutoScroll)
									scrollToElement(null, 'instant');

							// Unlock.
								locked = false;

						}

					return false;

				});

				// Hack: Allow hashchange to trigger on click even if the target's href matches the current hash.
					on('click', function(event) {

						var t = event.target,
							tagName = t.tagName.toUpperCase();

						// Find real target.
							switch (tagName) {

								case 'IMG':
								case 'SVG':
								case 'USE':
								case 'U':
								case 'STRONG':
								case 'EM':
								case 'CODE':
								case 'S':
								case 'MARK':
								case 'SPAN':

									// Find ancestor anchor tag.
										while ( !!(t = t.parentElement) )
											if (t.tagName == 'A')
												break;

									// Not found? Bail.
										if (!t)
											return;

									break;

								default:
									break;

							}

						// Target is an anchor *and* its href is a hash that matches the current hash?
							if (t.tagName == 'A'
							&&	t.getAttribute('href').substr(0, 1) == '#'
							&&	t.hash == window.location.hash) {

								// Prevent default.
									event.preventDefault();

								// Replace state with '#'.
									history.replaceState(undefined, undefined, '#');

								// Replace location with target hash.
									location.replace(t.hash);

							}

					});

		})();

	// Browser hacks.

		// Init.
			var style, sheet, rule;

			// Create <style> element.
				style = document.createElement('style');
				style.appendChild(document.createTextNode(''));
				document.head.appendChild(style);

			// Get sheet.
				sheet = style.sheet;

		// Mobile.
			if (client.mobile) {

				// Prevent overscrolling on Safari/other mobile browsers.
				// 'vh' units don't factor in the heights of various browser UI elements so our page ends up being
				// a lot taller than it needs to be (resulting in overscroll and issues with vertical centering).
					(function() {

						var f = function() {
							document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
							document.documentElement.style.setProperty('--background-height', (window.innerHeight + 250) + 'px');
						};

						on('load', f);
						on('resize', f);
						on('orientationchange', function() {

							// Update after brief delay.
								setTimeout(function() {
									(f)();
								}, 100);

						});

					})();

			}

		// Android.
			if (client.os == 'android') {

				// Prevent background "jump" when address bar shrinks.
				// Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
				// screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
					(function() {

						// Insert and get rule.
							sheet.insertRule('body::after { }', 0);
							rule = sheet.cssRules[0];

						// Event.
							var f = function() {
								rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
							};

							on('load', f);
							on('orientationchange', f);
							on('touchmove', f);

					})();

				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');

			}

		// iOS.
			else if (client.os == 'ios') {

				// <=11: Prevent white bar below background when address bar shrinks.
				// For some reason, simply forcing GPU acceleration on the background pseudoelement fixes this.
					if (client.osVersion <= 11)
						(function() {

							// Insert and get rule.
								sheet.insertRule('body::after { }', 0);
								rule = sheet.cssRules[0];

							// Set rule.
								rule.style.cssText = '-webkit-transform: scale(1.0)';

						})();

				// <=11: Prevent white bar below background when form inputs are focused.
				// Fixed-position elements seem to lose their fixed-ness when this happens, which is a problem
				// because our backgrounds fall into this category.
					if (client.osVersion <= 11)
						(function() {

							// Insert and get rule.
								sheet.insertRule('body.ios-focus-fix::before { }', 0);
								rule = sheet.cssRules[0];

							// Set rule.
								rule.style.cssText = 'height: calc(100% + 60px)';

							// Add event listeners.
								on('focus', function(event) {
									$body.classList.add('ios-focus-fix');
								}, true);

								on('blur', function(event) {
									$body.classList.remove('ios-focus-fix');
								}, true);

						})();

				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');

			}

		// IE.
			else if (client.browser == 'ie') {

				// Element.matches polyfill.
					if (!('matches' in Element.prototype))
						Element.prototype.matches = (Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);

				// Background fix.
				// IE doesn't consistently render background images applied to body:before so as a workaround
				// we can simply apply it directly to the body tag.
					(function() {

						var a = cssRules('body::before'),
							r;

						// Has a background?
							if (a.length > 0) {

								r = a[0];

								if (r.style.width.match('calc')) {

									// Force repaint.
										r.style.opacity = 0.9999;

										setTimeout(function() {
											r.style.opacity = 1;
										}, 100);

								}
								else {

									// Override body:before rule.
										document.styleSheets[0].addRule('body::before', 'content: none !important;');

									// Copy over background styles.
										$body.style.backgroundImage = r.style.backgroundImage.replace('url("images/', 'url("assets/images/');
										$body.style.backgroundPosition = r.style.backgroundPosition;
										$body.style.backgroundRepeat = r.style.backgroundRepeat;
										$body.style.backgroundColor = r.style.backgroundColor;
										$body.style.backgroundAttachment = 'fixed';
										$body.style.backgroundSize = r.style.backgroundSize;

								}

							}

					})();

				// Flexbox workaround.
				// IE's flexbox implementation doesn't work when 'min-height' is used, so we can work around this
				// by switching to 'height' but simulating the behavior of 'min-height' via JS.
					(function() {
						var t, f;

						// Handler function.
							f = function() {

								var mh, h, s, xx, x, i;

								// Wrapper.
									x = $('#wrapper');

									x.style.height = 'auto';

									if (x.scrollHeight <= innerHeight)
										x.style.height = '100vh';

								// Containers with full modifier.
									xx = $$('.container.full');

									for (i=0; i < xx.length; i++) {

										x = xx[i];
										s = getComputedStyle(x);

										// Get min-height.
											x.style.minHeight = '';
											x.style.height = '';

											mh = s.minHeight;

										// Get height.
											x.style.minHeight = 0;
											x.style.height = '';

											h = s.height;

										// Zero min-height? Do nothing.
											if (mh == 0)
												continue;

										// Set height.
											x.style.height = (h > mh ? 'auto' : mh);

									}

							};

						// Do an initial call of the handler.
							(f)();

						// Add event listeners.
							on('resize', function() {

								clearTimeout(t);

								t = setTimeout(f, 250);

							});

							on('load', f);

					})();

			}

		// Edge.
			else if (client.browser == 'edge') {

				// Columned container fix.
				// Edge seems to miscalculate column widths in some instances resulting in a nasty wrapping bug.
				// Workaround = left-offset the last column in each columned container by -1px.
					(function() {

						var xx = $$('.container > .inner > div:last-child'),
							x, y, i;

						// Step through last columns.
							for(i=0; i < xx.length; i++) {

								x = xx[i];
								y = getComputedStyle(x.parentNode);

								// Parent container not columned? Skip.
									if (y.display != 'flex'
									&&	y.display != 'inline-flex')
										continue;

								// Offset by -1px.
									x.style.marginLeft = '-1px';

							}

					})();

			}

		// Object-fit polyfill.
			if (!client.canUse('object-fit')) {

				// Image.
					(function() {

						var xx = $$('.image[data-position]'),
							x, w, c, i, src;

						for (i=0; i < xx.length; i++) {

							// Element, img.
								x = xx[i];
								c = x.firstElementChild;

								// Not an IMG? Strip off wrapper.
									if (c.tagName != 'IMG') {

										w = c;
										c = c.firstElementChild;

									}

							// Get src.
								if (c.parentNode.classList.contains('deferred')) {

									c.parentNode.classList.remove('deferred');
									src = c.getAttribute('data-src');
									c.removeAttribute('data-src');

								}
								else
									src = c.getAttribute('src');

							// Set src as element background.
								c.style['backgroundImage'] = 'url(\'' + src + '\')';
								c.style['backgroundSize'] = 'cover';
								c.style['backgroundPosition'] = x.dataset.position;
								c.style['backgroundRepeat'] = 'no-repeat';

							// Clear src.
								c.src = 'data:image/svg+xml;charset=utf8,' + escape('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"></svg>');

							// Hack: Fix "full column" elements (columned containers only).
								if (x.classList.contains('full')
								&&	(x.parentNode && x.parentNode.classList.contains('full'))
								&&	(x.parentNode.parentNode && x.parentNode.parentNode.parentNode && x.parentNode.parentNode.parentNode.classList.contains('container'))
								&&	x.parentNode.children.length == 1) {

									(function(x, w) {

										var	p = x.parentNode.parentNode,
											f = function() {

												// Set height to zero.
													x.style['height'] = '0px';

												// Clear timeout.
													clearTimeout(t);

												// Update after a short delay.
													t = setTimeout(function() {

														// Container inner is in "row" mode? Set fixed height.
															if (getComputedStyle(p).flexDirection == 'row') {

																// Wrapper (if it exists).
																	if (w)
																		w.style['height'] = '100%';

																// Element.
																	x.style['height'] = (p.scrollHeight + 1) + 'px';

															}

														// Otherwise, revert to auto height ...
															else {

																// Wrapper (if it exists).
																	if (w)
																		w.style['height'] = 'auto';

																// Element.
																	x.style['height'] = 'auto';

															}

													}, 125);

											},
											t;

										// Call handler on resize, load.
											on('resize', f);
											on('load', f);

										// Initial call.
											(f)();

									})(x, w);

								}

						}

					})();

				// Gallery.
					(function() {

						var xx = $$('.gallery img'),
							x, p, i, src;

						for (i=0;i < xx.length; i++) {

							// Img, parent.
								x = xx[i];
								p = x.parentNode;

							// Get src.
								if (p.classList.contains('deferred')) {

									p.classList.remove('deferred');
									src = x.getAttribute('data-src');

								}
								else
									src = x.getAttribute('src');

							// Set src as parent background.
								p.style['backgroundImage'] = 'url(\'' + src + '\')';
								p.style['backgroundSize'] = 'cover';
								p.style['backgroundPosition'] = 'center';
								p.style['backgroundRepeat'] = 'no-repeat';

							// Hide img.
								x.style['opacity'] = '0';

						}

					})();

			}
	//
	// // Timer.
	// 	/**
	// 	 * Timer.
	// 	 * @param {string} id ID.
	// 	 */
	// 	function timer(id, options) {
	//
	// 		var _this = this,
	// 			f;
	//
	// 		/**
	// 		 * ID.
	// 		 * @var {string}
	// 		 */
	// 		this.id = id;
	//
	// 		/**
	// 		 * Timestamp.
	// 		 * @var {integer}
	// 		 */
	// 		this.timestamp = options.timestamp;
	//
	// 		/**
	// 		 * Duration.
	// 		 * @var {integer}
	// 		 */
	// 		this.duration = options.duration;
	//
	// 		/**
	// 		 * Mode.
	// 		 * @var {string}
	// 		 */
	// 		this.mode = options.mode;
	//
	// 		/**
	// 		 * Precision.
	// 		 * @var {integer}
	// 		 */
	// 		this.precision = options.precision;
	//
	// 		/**
	// 		 * Complete URL.
	// 		 * @var {string}
	// 		 */
	// 		this.completeUrl = options.completeUrl;
	//
	// 		/**
	// 		 * Completion handler.
	// 		 * @var {function}
	// 		 */
	// 		this.completion = options.completion;
	//
	// 		/**
	// 		 * Persistent.
	// 		 * @var {bool}
	// 		 */
	// 		this.persistent = options.persistent;
	//
	// 		/**
	// 		 * Label style.
	// 		 * @var {integer}
	// 		 */
	// 		this.labelStyle = options.labelStyle;
	//
	// 		/**
	// 		 * Completed.
	// 		 * @var {bool}
	// 		 */
	// 		this.completed = false;
	//
	// 		/**
	// 		 * Status.
	// 		 * @var {string}
	// 		 */
	// 		this.status = null;
	//
	// 		/**
	// 		 * Timer.
	// 		 * @var {HTMLElement}
	// 		 */
	// 		this.$timer = document.getElementById(this.id);
	//
	// 		/**
	// 		 * Parent.
	// 		 * @var {HTMLElement}
	// 		 */
	// 		this.$parent = document.querySelector('#' + _this.$timer.id + ' ul');
	//
	// 		/**
	// 		 * Days.
	// 		 * @var {HTMLElement}
	// 		 */
	// 		this.days = {
	// 			$li: null,
	// 			$digit: null,
	// 			$components: null
	// 		};
	//
	// 		/**
	// 		 * Hours.
	// 		 * @var {HTMLElement}
	// 		 */
	// 		this.hours = {
	// 			$li: null,
	// 			$digit: null,
	// 			$components: null
	// 		};
	//
	// 		/**
	// 		 * Minutes.
	// 		 * @var {HTMLElement}
	// 		 */
	// 		this.minutes = {
	// 			$li: null,
	// 			$digit: null,
	// 			$components: null
	// 		};
	//
	// 		/**
	// 		 * Seconds.
	// 		 * @var {HTMLElement}
	// 		 */
	// 		this.seconds = {
	// 			$li: null,
	// 			$digit: null,
	// 			$components: null
	// 		};
	//
	// 		// Initialize.
	// 			this.init();
	//
	// 	};
	//
	// 		/**
	// 		 * Initialize.
	// 		 */
	// 		timer.prototype.init = function() {
	//
	// 			var _this = this,
	// 				kt, kd;
	//
	// 			// Set keys.
	// 				kt = this.id + '-timestamp';
	// 				kd = this.id + '-duration';
	//
	// 			// Mode.
	// 				switch (this.mode) {
	//
	// 					case 'duration':
	//
	// 						// Convert duration to timestamp.
	// 							this.timestamp = parseInt(Date.now() / 1000) + this.duration;
	//
	// 						// Persistent?
	// 							if (this.persistent) {
	//
	// 								// Duration doesn't match? Unset timestamp.
	// 									if (registry.get(kd) != this.duration)
	// 										registry.unset(kt);
	//
	// 								// Set duration.
	// 									registry.set(kd, this.duration);
	//
	// 								// Timestamp exists? Use it.
	// 									if (registry.exists(kt))
	// 										this.timestamp = parseInt(registry.get(kt));
	//
	// 								// Otherwise, set it.
	// 									else
	// 										registry.set(kt, this.timestamp);
	//
	// 							}
	// 							else {
	//
	// 								// Unset timestamp, duration.
	// 									if (registry.exists(kt))
	// 										registry.unset(kt);
	//
	// 									if (registry.exists(kd))
	// 										registry.unset(kd);
	//
	// 							}
	//
	// 						break;
	//
	// 					default:
	// 						break;
	//
	// 				}
	//
	// 			// Digits.
	//
	// 				// Interval.
	// 					window.setInterval(function() {
	//
	// 						// Update digits.
	// 							_this.updateDigits();
	//
	// 						// Update size.
	// 							_this.updateSize();
	//
	// 					}, 250);
	//
	// 				// Initial call.
	// 					this.updateDigits();
	//
	// 			// Size.
	//
	// 				// Event.
	// 					on('resize', function() {
	// 						_this.updateSize();
	// 					});
	//
	// 				// Initial call.
	// 					this.updateSize();
	//
	// 		};
	//
	// 		/**
	// 		 * Updates size.
	// 		 */
	// 		timer.prototype.updateSize = function() {
	//
	// 			var $items, $item, $digit, $components, $component, $label, $sublabel, $symbols,
	// 				w, iw, h, f, i, j, found;
	//
	// 			$items = document.querySelectorAll('#' + this.$timer.id + ' ul li .item');
	// 			$symbols = document.querySelectorAll('#' + this.$timer.id + ' .symbol');
	// 			$components = document.querySelectorAll('#' + this.$timer.id + ' .component');
	// 			h = 0;
	// 			f = 0;
	//
	// 			// Reset component heights.
	// 				for (j = 0; j < $components.length; j++) {
	//
	// 					$components[j].style.lineHeight = '';
	// 					$components[j].style.height = '';
	//
	// 				}
	//
	// 			// Reset symbol heights, font sizes.
	// 				for (j = 0; j < $symbols.length; j++) {
	//
	// 					$symbols[j].style.fontSize = '';
	// 					$symbols[j].style.lineHeight = '';
	// 					$symbols[j].style.height = '';
	//
	// 				}
	//
	// 			// Step through items.
	// 				for (i = 0; i < $items.length; i++) {
	//
	// 					$item = $items[i];
	// 					$component = $item.children[0].children[0];
	//
	// 					w = $component.offsetWidth;
	// 					iw = $item.offsetWidth;
	//
	// 					// Set digit font size.
	// 						$digit = $item.children[0];
	//
	// 						// Reset font size.
	// 							$digit.style.fontSize = '';
	//
	// 						// Set font size.
	// 							$digit.style.fontSize = (w * 1.65) + 'px';
	//
	// 						// Update component height.
	// 							h = Math.max(h, $digit.offsetHeight);
	//
	// 						// Update font size.
	// 							f = Math.max(f, (w * 1.65));
	//
	// 					// Set label visibility (if it exists).
	// 						if ($item.children.length > 1) {
	//
	// 							$label = $item.children[1];
	// 							found = false;
	//
	// 							// Step through sub-labels.
	// 								for (j = 0; j < $label.children.length; j++) {
	//
	// 									$sublabel = $label.children[j];
	//
	// 									// Reset sub-label visibility.
	// 										$sublabel.style.display = '';
	//
	// 									// Able to fit *and* haven't found a match already? Show sub-label.
	// 										if (!found && $sublabel.offsetWidth < iw) {
	//
	// 											found = true;
	// 											$sublabel.style.display = '';
	//
	// 										}
	//
	// 									// Otherwise, hide it.
	// 										else
	// 											$sublabel.style.display = 'none';
	//
	// 								}
	//
	// 						}
	//
	// 				}
	//
	// 			// Hack: Single component *and* uses a solid/outline background? Force height to that of background to
	// 			// ensure longer digits (>=3) render correctly.
	// 				if ($items.length == 1) {
	//
	// 					var x = $items[0].children[0],
	// 						xs = getComputedStyle(x),
	// 						xsa = getComputedStyle(x, ':after');
	//
	// 					if (xsa.content != 'none')
	// 						h = parseInt(xsa.height) - parseInt(xs.marginTop) - parseInt(xs.marginBottom) + 24;
	//
	// 				}
	//
	// 			// Set component heights.
	// 				for (j = 0; j < $components.length; j++) {
	//
	// 					$components[j].style.lineHeight = h + 'px';
	// 					$components[j].style.height = h + 'px';
	//
	// 				}
	//
	// 			// Set symbol heights, font sizes.
	// 				for (j = 0; j < $symbols.length; j++) {
	//
	// 					$symbols[j].style.fontSize = (f * 0.5) + 'px';
	// 					$symbols[j].style.lineHeight = h + 'px';
	// 					$symbols[j].style.height = h + 'px';
	//
	// 				}
	//
	// 			// Set parent height.
	// 				this.$parent.style.height = '';
	// 				this.$parent.style.height = this.$parent.offsetHeight + 'px';
	//
	// 		};
	//
	// 		/**
	// 		 * Updates digits.
	// 		 */
	// 		timer.prototype.updateDigits = function() {
	//
	// 			var _this = this,
	// 				x = [
	// 					{
	// 						class: 'days',
	// 						digit: 0,
	// 						label: {
	// 							full: 'Days',
	// 							abbreviated: 'Days',
	// 							initialed: 'D'
	// 						}
	// 					},
	// 					{
	// 						class: 'hours',
	// 						digit: 0,
	// 						label: {
	// 							full: 'Hours',
	// 							abbreviated: 'Hrs',
	// 							initialed: 'H'
	// 						}
	// 					},
	// 					{
	// 						class: 'minutes',
	// 						digit: 0,
	// 						label: {
	// 							full: 'Minutes',
	// 							abbreviated: 'Mins',
	// 							initialed: 'M'
	// 						}
	// 					},
	// 					{
	// 						class: 'seconds',
	// 						digit: 0,
	// 						label: {
	// 							full: 'Seconds',
	// 							abbreviated: 'Secs',
	// 							initialed: 'S'
	// 						}
	// 					},
	// 				],
	// 				now, diff,
	// 				zeros, status, i, j, x, z, t, s;
	//
	// 			// Mode.
	// 				now = parseInt(Date.now() / 1000);
	//
	// 				switch (this.mode) {
	//
	// 					case 'countdown':
	// 					case 'duration':
	//
	// 						// Timestamp exceeds now? Set diff to difference.
	// 							if (this.timestamp >= now)
	// 								diff = this.timestamp - now;
	//
	// 						// Otherwise ...
	// 							else {
	//
	// 								// Set diff to zero.
	// 									diff = 0;
	//
	// 								// Not yet completed?
	// 									if (!this.completed) {
	//
	// 										// Mark as completed.
	// 											this.completed = true;
	//
	// 										// Completion handler provided? Call it.
	// 											if (this.completion)
	// 												(this.completion)();
	//
	// 										// Complete URL was provided? Redirect to it.
	// 											if (this.completeUrl)
	// 												window.setTimeout(function() {
	// 													window.location.href = _this.completeUrl;
	// 												}, 1000);
	//
	// 									}
	//
	// 							}
	//
	// 						break;
	//
	// 					default:
	// 					case 'default':
	//
	// 						// Timestamp exceeds now? Set diff to difference.
	// 							if (this.timestamp >= now)
	// 								diff = this.timestamp - now;
	//
	// 						// Otherwise, set diff to (negative) difference.
	// 							else
	// 								diff = now - this.timestamp;
	//
	// 						break;
	//
	// 				}
	//
	// 			// Update counts.
	//
	// 				// Days.
	// 					x[0].digit = Math.floor(diff / 86400);
	// 					diff -= x[0].digit * 86400;
	//
	// 				// Hours.
	// 					x[1].digit = Math.floor(diff / 3600);
	// 					diff -= x[1].digit * 3600;
	//
	// 				// Minutes.
	// 					x[2].digit = Math.floor(diff / 60);
	// 					diff -= x[2].digit * 60;
	//
	// 				// Seconds.
	// 					x[3].digit = diff;
	//
	// 			// Count zeros.
	// 				zeros = 0;
	//
	// 				for (i = 0; i < x.length; i++)
	// 					if (x[i].digit == 0)
	// 						zeros++;
	// 					else
	// 						break;
	//
	// 			// Delete zeros if they exceed precision.
	// 				while (zeros > 0 && x.length > this.precision) {
	//
	// 					x.shift();
	// 					zeros--;
	//
	// 				}
	//
	// 			// Determine status.
	// 				z = [];
	//
	// 				for (i = 0; i < x.length; i++)
	// 					z.push(x[i].class);
	//
	// 				status = z.join('-');
	//
	// 			// Output.
	//
	// 				// Same status as before? Do a quick update.
	// 					if (status == this.status) {
	//
	// 						var $digit, $components;
	//
	// 						for (i = 0; i < x.length; i++) {
	//
	// 							$digit = document.querySelector('#' + this.id + ' .' + x[i].class + ' .digit');
	// 							$components = document.querySelectorAll('#' + this.id + ' .' + x[i].class + ' .digit .component');
	//
	// 							// No digit? Skip.
	// 								if (!$digit)
	// 									continue;
	//
	// 							// Get components.
	// 								z = [];
	// 								t = String(x[i].digit);
	//
	// 								if (x[i].digit < 10) {
	//
	// 									z.push('0');
	// 									z.push(t);
	//
	// 								}
	// 								else
	// 									for (j = 0; j < t.length; j++)
	// 										z.push(t.substr(j, 1));
	//
	// 							// Update count class.
	// 								$digit.classList.remove('count1', 'count2', 'count3', 'count4');
	// 								$digit.classList.add('count' + z.length);
	//
	// 							// Same number of components? Just update values.
	// 								if ($components.length == z.length) {
	//
	// 									for (j = 0; j < $components.length && j < z.length; j++)
	// 										$components[j].innerHTML = z[j];
	//
	// 								}
	//
	// 							// Otherwise, create new components.
	// 								else {
	//
	// 									s = '';
	//
	// 									for (j = 0; j < $components.length && j < z.length; j++)
	// 										s += '<span class="component x' + Math.random() + '">' + z[j] + '</span>';
	//
	// 									$digit.innerHTML = s;
	//
	// 								}
	//
	// 						}
	//
	// 					}
	//
	// 				// Otherwise, do a full one.
	// 					else {
	//
	// 						s = '';
	//
	// 						for (i = 0; i < x.length && i < this.precision; i++) {
	//
	// 							// Get components.
	// 								z = [];
	// 								t = String(x[i].digit);
	//
	// 								if (x[i].digit < 10) {
	//
	// 									z.push('0');
	// 									z.push(t);
	//
	// 								}
	// 								else
	// 									for (j = 0; j < t.length; j++)
	// 										z.push(t.substr(j, 1));
	//
	// 							// Delimiter.
	// 								if (i > 0)
	// 									s +=	'<li class="delimiter">' +
	// 												'<span class="symbol">:</span>' +
	// 											'</li>';
	//
	// 							// Number.
	// 								s +=		'<li class="number ' + x[i].class + '">' +
	// 												'<div class="item">';
	//
	// 								// Digit.
	// 									s +=			'<span class="digit count' + t.length + '">';
	//
	// 									for (j = 0; j < z.length; j++)
	// 										s +=			'<span class="component">' + z[j] + '</span>';
	//
	// 									s +=			'</span>';
	//
	// 								// Label.
	// 									switch (this.labelStyle) {
	//
	// 										default:
	// 										case 'full':
	// 											s +=					'<span class="label">' +
	// 																		'<span class="full">' + x[i].label.full + '</span>' +
	// 																		'<span class="abbreviated">' + x[i].label.abbreviated + '</span>' +
	// 																		'<span class="initialed">' + x[i].label.initialed + '</span>' +
	// 																	'</span>';
	//
	// 											break;
	//
	// 										case 'abbreviated':
	// 											s +=					'<span class="label">' +
	// 																		'<span class="abbreviated">' + x[i].label.abbreviated + '</span>' +
	// 																		'<span class="initialed">' + x[i].label.initialed + '</span>' +
	// 																	'</span>';
	//
	// 											break;
	//
	// 										case 'initialed':
	// 											s +=					'<span class="label">' +
	// 																		'<span class="initialed">' + x[i].label.initialed + '</span>' +
	// 																	'</span>';
	//
	// 											break;
	//
	// 										case 'none':
	// 											break;
	//
	// 									}
	//
	// 								s +=			'</div>' +
	// 											'</li>';
	//
	// 						}
	//
	// 						// Replace HTML.
	// 							_this.$parent.innerHTML = s;
	//
	// 						// Update status.
	// 							this.status = status;
	//
	// 					}
	//
	// 		};
	//
	// // Timer: timer01.
	// 	new timer(
	// 		'timer01',
	// 		{
	// 			mode: 'countdown',
	// 			precision: 4,
	// 			completeUrl: '',
	// 			timestamp: 1633791600,
	//
	// 			labelStyle: 'full'
	// 		}
	// 	);

	// Deprecated by Identiji team
	// Buttons: buttons01.
	//	$('#buttons01 > li:nth-child(1) > a').addEventListener(
	//		'click',
	//		function(event) {
	//			console.log("Obscure button clicked");
	//		}
	//	);

	//	$('#buttons01 > li:nth-child(2) > a').addEventListener(
	//		'click',
	//		function(event) {
	//			console.log("Show button clicked");
	//		}
	//	);

})();
