_Literate_ CoffeeScript you say?
================================

"...why set the bar so low say I, why stop at plain old literate scripting 
when one can now reach for the truly _literary_."

My words echoed hollow with our footsteps across the factory floor waiting to 
be filled; the grand auditorium would soon be abuzz with the orchestra of 
industry blasting out a Futurist symphony of progress, but for now fell silent 
as Mr. Horsfall and I approached the low humm of the lone machine sitting 
obediently still in the corner.

Horsfall curled the end of his mustache between his thumb and forefinger for a 
time as he gazed upon the grey box; still contemplating that middle ground 
between intrigued and unconvinced.

"These are rapidly changing times which we line in Horsfall, and this here is 
the way of the future - just you wait and see. Why, I predict that by within 
our lifetimes the average working man will see the burden of his labours cut 
in twain with these wondrous new machines from Mr Babbage taking the lions 
share of the work, leaving him with leisure time to indulge in more 
self-improving activities: the sciences, literature, the opera and what have 
you."

"Utter tosh!" the tycoon finally broke his steely silence. "It's Bolshevism 
and a very corruption of the work ethic that made this country what it is 
today. You are naive to think those uneducated layouts would choose Wagner or 
Verdi over their raucous dancehalls doused in hard liquer and loose women.

"This fanciful day-dreaming of yours aside, if all this new mechanical 
gadgetery is what it's cracked up to be, then there may be something to this. 
If these machines can tirelessly generate line after line of pure code more 
speedily and efficiently than any _man_ can, then we shall have no need of 
that expensive union labour; any old code monger could tend to these machines 
and keep them running 'round the clock. Why, even women and children could do 
that work and they'd bally well cost me a lot less to boot! With the money I'd 
save on labour, I'd wager I could easily have hundreds of these machines in 
here soon, churning out hundreds of thousands of lines of code a day!"

"But you miss the point my good man, the quanity of code is not the correct 
measure of its worth; there is skill and artistry to creating beautiful, 
elegant code."

"Balderdash! What differenece could it make to me if it were wrtten by a 
machine with a mangey dog at the controls or by Wordsworth himself? When all 
is said and done young Chadwick, if it works, it works and that's all there is 
to it!" Horsfall spat as he slammed his fist down into the desk, an embodied 
expression of the final full stop on that conversation.

With the shake of the desk, the hardened disks roused from their sleep and the 
cathode rays flicked to attendtion, "What's this now? What happened to those 
angelic toasting machines?"

"That was just the machine in 'stand by mode', it has switched over to the 
active mode now, and look here I can show you the kind of thing that a skilled 
craftsman from the coding guild can do with these machines:

"You see here," I ponted, "...is where one checks to see if this instance of 
the code has been called as an extension to Google Industries' Chrome Browser.

		window.isChromeExtension = chrome and "extension" in _.keys(chrome)

"...and if so then we shall ensure that said browser goes to the index page 
that we've included:

		if window.isChromeExtension and not (window.location.href == chrome.extension.getURL("index.html"))
			window.location.href = chrome.extension.getURL("index.html")

"Hold up there for a minute boy! What's all this nonsense about 'googles' and 
'chromium extensions' of which you sepak?"

"Ah, I do apologise but you see for this demonstration application I have 
chosen to build a Chrome Extension. It's all quite the rage down at the 
developers guild hall, I can assure you. You can read all about it Google 
Industrustries latest periodical here:
http://developer.chrome.com/extensions/index.html
It's with all this in mind that we include the manifest file and of course the 
'index' file which is our 'document':

		$(document).ready ->

..which when ready, we shall add an event listener to show and hide the 
instructions to the user:

			$informational_text = $('#informational_text_area')
			$informational_text.on "click", "button", (e) =>
				$informational_text.find("#explanatory_text").toggle()

And then in the main area of the document, we shall set that up to become an 
instance of the 'James Baxter' class:

			$main = $('#main')
			new JamesBaxter $main, (jb) =>
				$main.on "mousedown", (e) =>

...whcih will react to when the user clicks their mouse down by 'playing' the 
animation

					jb.start()
					$informational_text.find("#initial_instructional_text").hide()
					$informational_text.find("#explanatory_text").hide()

...and hiding the informational text out of the way of course.
And similarly, it will react to the user letting go of the mouse button to 
stop the animation:"

				$main.on "mouseup", (e) =>
					jb.stop()

"But where's the actually work? There's hardly any code there at all," 
Horsfall cried in disbelief.

"It's all in the organisation you see; the JamesBaxter class deals with all 
that [over here](JamesBaxter.coffee.md)."
