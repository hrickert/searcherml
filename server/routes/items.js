const router = require('express').Router();
var request = require('request');
const url = require('url');
var _ = require('lodash');

const externalApiUrl = "https://api.mercadolibre.com";

// Testear

function callExternalAPI(options, callback) {
    request(options, function (error, response, body) {
        if (response.statusCode == 200) {
            res = body;
        }
        else {
            res = {error: response.statusMessage, statusCode: response.statusCode}
        }
        callback(res);
    });
}

function getCategories(data) {
    let categoriesObj = _.find(data, (f) => f.id === "category");
    return categoriesObj && categoriesObj.values[0]? _.map(categoriesObj.values[0].path_from_root, (v)=> v.name) : []
}

router.get('/', function(req, res) {
    let urlParse = url.parse(req.url, true);
    let search = urlParse.search;
    let options = {
        uri : `${externalApiUrl}/sites/MLA/search${search}`,
        method : 'GET'
    }

    callExternalAPI(options, function(resp){
        if (resp.error) {
            // FIXME usar middleware
            res.status(resp.statusCode || 500);
            res.json({ error: resp.error });
        } else {
            let body = JSON.parse(resp)
            body = transformItemsData(body)
            res.json(body);
        }
    })
})

function transformItemsData(data) {
    let results = {
        author: {
            name: process.env.npm_package_author,
        }
    };// FIXME agregar author
    results.categories = getCategories(data['filters']);
    results.items = _.map(data.results, (r)=> {
        return {
            id: r.id,
            title: r.title,
            price: {
                currency: r.currency_id,
                amount: r.price,
                decimals: r.decimals
            },
            picture: r.thumbnail,
            condition: r.condition,
            free_shipping: r.shipping.free_shipping,
            address_state_name: r.address.state_name
        }
    })

    return results;    
}

router.get('/:id', function(req, res) {
    let options = {
        uri : `${externalApiUrl}/items/${req.params.id}`,
        method : 'GET'
    }

    callExternalAPI(options, function(resp){
        if (resp.error) {
            res.status(resp.statusCode || 500);
            res.json({ error: resp.error });
        } else {
            let data = JSON.parse(resp)
            body = transformItemData(data)

            let options = {
                uri : `${externalApiUrl}/items/${req.params.id}/description`,
                method : 'GET'
            }
            callExternalAPI(options, function(resp){
                if (resp.error) {
                    res.status(resp.statusCode || 500);
                    res.json({ error: resp.error });
                } else {
                    let data = JSON.parse(resp)
                    body.item.description = data.plain_text
                    res.json(body);
                }
            })
        }
    })
})

function transformItemData(data) {
    let results = {
        author: {
            name: process.env.npm_package_author
        }
    };// FIXME agregar author
    results.categories = getCategories(data['filters']);
    results.item = {
            id: data.id,
            title: data.title,
            price: {
                currency: data.currency_id,
                amount: data.price,
                decimals: data.decimals
            },
            picture: data.pictures[0].url,
            condition: data.condition,
            free_shipping: data.shipping.free_shipping,
            sold_quantity: data.sold_quantity,
        }

    return results;    
}

module.exports = router