"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventRoute_1 = __importDefault(require("./route/EventRoute"));
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(EventRoute_1.default);
const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
