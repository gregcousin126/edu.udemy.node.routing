const express = require('express');
const router = express.Router();
const Page = require(rootPath + '/app/models/pages');

/* GET users listing. */
router.post('/', async (req, res) => {
	let page = new Page();
	page.name = req.body.name;
	page.url = req.body.url;
	page.title = req.body.title;
	page.language = req.body.language;
	page.html = req.body.html;
	try {
		let doc = await page.save();
		res.json(doc);
	}
	catch(err) {	
		res.send(err);
	}
});

// async : declaration of function, means two points :
// - 1 - this function return a promise - 2 - this function use an await keyword
router.get('/:name', async (req, res) => {
	// use params instead of body
	// --> extract value from url (pages/hello)
	let wantedPage = await Page.findOne({ name : req.params.name });
	if (wantedPage !== null) {
		console.log(wantedPage);
		try {
			res.render(wantedPage.template, wantedPage, (err, str) => {
				if (err) throw new Error(err);
				else res.send(str); // return data to router
			});
		}
		catch(e) {
			console.log(e);
			res.render('page/index', wantedPage);	
		}
	}
	else {
		let defaultPage = await Page.findOne({ name: "404" });
		res.render('page', defaultPage);
	}
});
router.put('/:name', async (req, res) => {
  let page = await Page.findOne({ name : req.params.name });
  if (page !== null) {
    const property = req.body.property;
    const value = req.body.value;
    page[property] = value;
    let result;
    try {
     result = await page.save();
    }
    catch(e) {
      result = e;
    }
    res.send(result);
  }
  else {
    res.send('page not found');
  }
});

// =  assign, ==  fast equals, === strong equals
// www.site.com?param=12&param2=84&parems=52 => retrieve it using req.query
router.put('/:name/updateScript', async (req, res) => {
  let page = await Page.findOne({ name : req.params.name });
  let result = page;
  if (page !== null) {
  	const action = req.body.action;
    const url = req.body.url;
    if (action === "add") {
    	if (page.scripts.includes(url) === false) {
    		page.scripts.push(url);
    		result = await page.save();
    	}
    }
    if (action === "remove") {
    	const index = page.scripts.indexOf(url);
    	if (index >= 0) {
    		page.scripts.splice(index, 1);
    		result = await page.save();
    	}
    }
    res.json(result);
  }
  else {
    res.send('page not found');
  }
});
module.exports = router;
