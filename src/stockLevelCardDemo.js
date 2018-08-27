"use strict";
/* global $ */

import StockLevelCardService from './stockLevelCardService.js';
import TemplateService from './templateService.js';

export default class StockLevelCardDemo {

    constructor() {
        // wait for dom to be loaded
        this.stockLevelCardService = new StockLevelCardService();
        // this.initializeStockLevelCards.bind(this);
        
        document.addEventListener("DOMContentLoaded", function() {
            // fetch card body template
            let cardContainer = document.getElementById("cardContainer");
            TemplateService.fetchTemplate("stock-level-template").done(function(template) {
                this.initializeStockLevelCards(template, cardContainer);
            }.bind(this));
            
            TemplateService.fetchTemplate("template-with-image").done(function(template) {
                this.initializeImageCards(template, cardContainer);
            }.bind(this));

            setTimeout(function() {
                $(cardContainer).find(".rotateCard").on("click",
                    function(btn) {
                        this.rotateCard(btn.currentTarget);
                    }.bind(this));
            }.bind(this), 500);
        }.bind(this));
    }

    initializeStockLevelCards(template, cardContainer) {

        // fetch stock level data from backend; and use to populate our card
        this.stockLevelCardService.fetchStockLevels().done(function(stockLevels) {
            for (var a = 0; a < stockLevels.length; a++) {
                let stockLevel = stockLevels[a];
                var html = template(stockLevel);

                // Insert the HTML code into the page
                $(cardContainer).append(html);
            }

        });
    }

    initializeImageCards(template, cardContainer) {
        let context = {};
        var html = template(context);
        // Insert the HTML code into the page
        $(cardContainer).append(html);
    }

    rotateCard(btn) {
        let card = $(btn).closest('.card-container');
        if (card.hasClass('hover')) {
            card.removeClass('hover');
        }
        else {
            card.addClass('hover');
        }
    }
}
