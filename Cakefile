###
sorry ted, i was going a bit mad there - but deadly, i don't need to pretend
I'm a 19th century novelist for this bit since it's outside the scope of main
code.

this bit here is just the Cakefile/build script for the project.
kinda based on Stephen Ball's coffee-taster:
https://github.com/sdball/coffee-taster
...but without any of that Ruby stuff.
And actually, at this stage kinda is completely re-written for what I wanted 
to do with it, but yeah - Stephen's code is a good place to start if you're 
new to this (and probably a little more sane and readable than mine).

For this you just need node, coffee-script (and stylus for the css. If you 
like LESS/SASS/Anything elSSs then it should be easy enough to swap out the 
stylus-specific bits to the css-preprocessor of your choice).

There are no extra libraries/extensions required here, just the base 
node/coffee set up. Although it probably would've been easier to use something 
for the fancier filesystem stuff since node is still a little limited here 
(see helper functions below).

Basically, this watches the coffee & stylus dirs and anytime there's an 
update, compiles and dumps out to a tmp directory.
Anytime the tmp directory changes, the contents are grabbed, merged and copied 
to the output package directory.
On start up, that output dir is wiped and re-created with all the 
assets/external js/supporting files copied across.
It's assumed that only the coffee/stylus will actually be edited much while 
developing.
If anything else changes, kill the script and run again to update those.

###
fs = require 'fs'
{spawn, exec} = require 'child_process'

# some paths used in the build - 
APP_NAME = "JamesBaxter"
COFFEE_DIR = "coffee/"
STYLUS_DIR = "stylus/"
TMP_DIR = "tmp/"
PKG_DIR = "pkg/"
LIBS_DIR = "external/"

###
These next 3 are just file system helper functions.
Calling exec on the actually shell comand would be easier, but less portable, 
so trying to keep these in pure coffee/node.
###
copyFileSync = (fname, path) ->
	return unless fs.existsSync(path)
	path = path + "/" unless path.slice(-1) == "/"
	# exec "cp #{fname} #{path}#{fname}"	
	content = fs.readFileSync(fname)
	fs.writeFileSync(path+fname, content)

copyFolderRecursive = (dir, newPath) ->
	return unless fs.existsSync(dir)
	newPath = newPath + "/" unless newPath.slice(-1) == "/"
	# TODO: fix this one too...    
	exec "cp -r #{dir} #{newPath}#{dir}"

deleteFolderRecursive = (path) ->
	return unless fs.existsSync(path)
	path = path + "/" unless path.slice(-1) == "/"
	# exec "rm -rf #{path}"
	for file in fs.readdirSync(path)
		if file
			curPath = path + file
			console.log curPath
			if fs.statSync(curPath).isDirectory()
				deleteFolderRecursive(curPath)
			else
				fs.unlinkSync(curPath)
	fs.rmdirSync(path)


task "build", "build and watch the source, output to pkg", ->
	console.log "Packaging Static files..."

	deleteFolderRecursive(TMP_DIR)	  
	fs.mkdirSync TMP_DIR

	deleteFolderRecursive(PKG_DIR)	  
	fs.mkdirSync PKG_DIR
	fs.mkdirSync "#{PKG_DIR}#{APP_NAME}"
	fs.mkdirSync "#{PKG_DIR}#{APP_NAME}/js/"		
	fs.mkdirSync "#{PKG_DIR}#{APP_NAME}/css/"	 

	copyFileSync("index.html", "#{PKG_DIR}#{APP_NAME}/") 
	copyFileSync("manifest.json", "#{PKG_DIR}#{APP_NAME}/") 
	copyFileSync("icon.png", "#{PKG_DIR}#{APP_NAME}/")

	copyFolderRecursive("assets/", "#{PKG_DIR}#{APP_NAME}/")

	console.log "Combining External JS files..."
	fs.readdir LIBS_DIR, (err, files) ->
		external = ""
		for f in files
			if f.indexOf(".js") > 0
				external = external + fs.readFileSync(LIBS_DIR+f) + "\n\n"
		fs.writeFileSync "#{PKG_DIR}#{APP_NAME}/js/external.js", external

	console.log "Spawning Coffee..."
	# NOTE: keep classes 'bare' for simpler projects.
	# remove this and add a root/window anchor if you want closures on bigger projects
	coffeeCompiler = spawn 'coffee', ['--compile', '--bare', '--watch', '--output', TMP_DIR, COFFEE_DIR]
	coffeeCompiler.stdout.on 'data', (data) -> console.log data.toString().trim()
	coffeeCompiler.stderr.on 'data', (data) -> console.error data.toString().trim()

	console.log "Spawning Stylus..."
	stylusCompiler = spawn 'stylus', [STYLUS_DIR, '--watch', '--out', TMP_DIR]
	stylusCompiler.stdout.on 'data', (data) -> console.log data.toString().trim()
	stylusCompiler.stderr.on 'data', (data) -> console.error data.toString().trim()

	console.log "Setup Watcher..."
	fs.watch TMP_DIR, (event, filename) ->
		console.log "Updating..."
		fs.readdir "tmp", (err, files) ->
			allCss = ""
			allJs = ""
			for f in files
				if f.indexOf(".js") > 0
					allJs = allJs + fs.readFileSync(TMP_DIR+f) + "\n\n"
				if f.indexOf(".css") > 0
					allCss = allCss + fs.readFileSync(TMP_DIR+f) + "\n\n"

			fs.writeFileSync "#{PKG_DIR}#{APP_NAME}/js/app.js", allJs
			fs.writeFileSync "#{PKG_DIR}#{APP_NAME}/css/style.css", allCss
			console.log "...PKG Updated"
