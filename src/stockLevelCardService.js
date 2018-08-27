"use strict";
/* global $ */

export default class StockLevelCardService {

    constructor() {}

    /**
     * fetch stock level data from backend; and use to populate our card
     **/
    fetchStockLevels() {
        return $.getJSON("/data/sample/stock-level-data.json");
    }
}
