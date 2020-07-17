/**class Portfolio{
    set Returns(Returns){
        this._Returns=Returns;
    }
    set Volatility(Volatility){
        this._Volatility=Volatility;
    }
    set SharpeRatio(SharpeRatio){
        this._SharpeRatio=SharpeRatio;
    }
    set CoalWeight(CoalWeight){
        this._CoalWeight=CoalWeight;
    }
    set GoldWeight(GoldWeight){
        this._GoldWeight=GoldWeight;
    }
    set SilverWeight(SilverWeight){
        this._SilverWeight=SilverWeight;
    }
    set CopperWeight(CopperWeight){
        this._CopperWeight=CopperWeight;
    }
    set TinWeight(TinWeight){
        this._TinWeight=TinWeight;
    }
    set CoffeeWeight(CoffeeWeight){
        this._CoffeeWeight=CoffeeWeight;
    }
    set WheatWeight(WheatWeight){
        this._WheatWeight=WheatWeight;
    }
    set MilkWeight(MilkWeight){
        this._MilkWeight=MilkWeight;
    }
    set Nifty50Weight(Nifty50Weight){
        this._Nifty50Weight=Nifty50Weight;
    }
    set JASDAQWeight(JASDAQWeight){
        this._JASDAQWeight=JASDAQWeight;
    }
    set BSEWeight(BSEWeight){
        this._BSEWeight=BSEWeight;
    }
    set NASDAQWeight(NASDAQWeight){
        this._NASDAQWeight=NASDAQWeight;
    }
    set SnP500Weight(SnP500Weight){
        this._SnP500Weight=SnP500Weight;
    }
    set DJIWeight(DJIWeight){
        this._DJIWeight=DJIWeight;
    }
    set NYSEWeight(NYSEWeight){
        this._NYSEWeight=NYSEWeight;
    }
    set NASDAQWeight(NASDAQWeight){
        this._NASDAQWeight=NASDAQWeight;
    }
    set Russell2000Weight(Russell2000Weight){
        this._Russell2000Weight=Russell2000Weight;
    }
    set Nikkei225Weight(Nikkei225Weight){
        this._Nikkei225Weight=Nikkei225Weight;
    }
    set RiceWeight(RiceWeight){
        this._RiceWeight=RiceWeight;
    }
    set CottonWeight(CottonWeight){
        this._CottonWeight=CottonWeight;
    }
    set GasolineWeight(GasolineWeight){
        this._GasolineWeight=GasolineWeight;
    }
    set TreasuryBondsWeight(TreasuryBondsWeight){
        this._TreasuryBondsWeight=TreasuryBondsWeight;
    }
    set FedBondsWeight(FedBondsWeight){
        this._FedBondsWeight=FedBondsWeight;
    }
    set INRWeight(INRWeight){
        this._INRWeight=INRWeight;
    }
    set JPYWeight(JPYWeight){
        this._JPYWeight=JPYWeight;
    }

    getData() {
    	return this;
    }
    constructor(){
    }
}**/



var express = require('express');
var router = express.Router();

const csv=require('csvtojson')
// Invoking csv returns a promise
const converter=csv()
.fromFile('C:/node/nodetest1/routes/frontier.csv')
.then((json)=>{

	const port = json;
	router.get('/second', function(req, res,next) {
  	res.render('second',{data: JSON.stringify(port)});
	});
    //let p;
    //json.forEach((row)=>{
    //    p=new Portfolio();// New Employee Object
    //    Object.assign(p,row);// Assign json to the new Employee
    //    port.push(p);// Add the Employee to the Array
    //    });
});






/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




//router.get('/second', function(req, res) {
//  res.render('second',{portfolio: port});
//});
/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('balances');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User', res: 0 });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

	var userName = req.body.username;
    var userIncome = req.body.userincome;
    var userExpense = req.body.userexpense;
    var userSurplus = parseInt(userIncome,10) - parseInt(userExpense,10);

	let options = {
  		mode: 'text',
  		pythonOptions: ['-u'], // get print results in real-time
  		scriptPath: '/node/nodetest1/node_modules/python-shell',
  		args: [userSurplus]
	};


	var {PythonShell} = require('python-shell');
	//var pyshell = new PythonShell('script.py',options);

	var net = 0;

	PythonShell.run('script.py', options, function (err, results) {
                if (err) throw err;
                res.render('newuser', { title: 'Add New User', res: results });});
	//pyshell.send(JSON.stringify([1,2,3,4,5]));

	//pyshell.on('message', function (message) {
	    // received a message sent from the Python script (a simple "print" statement)
	    //console.log(message);
	//});

	// end the input stream and allow the process to exit
	//pyshell.end(function (err) {
	  //  if (err){
	    //    throw err;
	  //  };
	
	    //console.log('finished');
	//});

    // Set our internal DB variable

    console.log("Hello World");
    console.log(results                                           );

    var db = req.db;

    // Get our form values. These rely on the "name" attributes

    // Set our collection
    var collection = db.get('balances');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "income" : userIncome,
        "expense" : userExpense,
        "surplus" : userSurplus
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            //res.redirect("userlist");
        }
    });

   

});

module.exports = router;
