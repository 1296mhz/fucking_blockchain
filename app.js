const express = require("express");
const bodyParser = require("body-parser");
const BrewNode = require("./brewNode");
const cors = require('cors');
const port = 18070 + Number(Math.floor(Math.random() * 30));
console.log("starting node on ", port);
let node1 = new BrewNode(port);

node1.init();

const http_port = 3000 + Number(Math.floor(Math.random() * 10));

let BrewHTTP = function() {
  const app = new express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/addNode/:port", (req, res) => {
    console.log("add host: " + req.params.port);
    node1.addPeer("localhost", req.params.port);
    res.send();
  });

  app.get("/createBlock/:teammember", (req, res) => {
    let newBlock = node1.createBlock(req.params.teammember);
    console.log("block created ", newBlock);
    res.json({ status: "block created", block: newBlock });
  });

  app.get("/getStats/", (req, res) => {
    const stats = node1.getStats();
    res.json({ stats: stats });
  });

  //getBlockByIndex
  app.get("/getBlockByIndex/:index", (req, res) => {
    const block = node1.getBlockByIndex(req.params.index);
	 console.log(block)
    res.json(block);
  });

  app.listen(http_port, () => {
    console.log(`http server up.. ${http_port}`);
  });
};

let httpserver = new BrewHTTP();
