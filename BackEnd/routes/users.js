var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
  user: 'wu.chong',  
  password: 'xxx123#', 
  server: "213.140.22.237", 
  database: 'wu.chong',
}


let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request();
    request.query(query, function (err, result) { 
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      res.send(result.recordset);
      sql.close();
    });

  });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  let sqlQuery = "select * from dbo.[cr-unit-attributes]";
  executeQuery(res, sqlQuery, next);
});

router.get('/search/:name', function (req, res, next) {
  let sqlQuery = `select * from dbo.[cr-unit-attributes] where Unit = '${req.params.name}'`;
  executeQuery(res, sqlQuery, next);
});


router.post('/', function (req, res, next) {
  // Add a new Unit  
  let unit = req.body;
  console.log(unit);
  if (!unit) {  //Qui dovremmo testare tutti i campi della richiesta
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return;
  }
  let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit,Cost,Hit_Speed) 
                     VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}')`;
  executeQuery(res, sqlInsert, next);
  res.send({success:true, message: "unità inserita con successo", unit: unit})
});

module.exports = router;