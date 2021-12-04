
"use strict"

var assert = require('assert');
var request = require('supertest')
var app = require('../app.js')

var request = request("http://localhost:3001")

describe('Listado de items', function() {
    describe('GET', function(){
        it('Cuando no se pasa una query, retorna NOT FOUND 404', function(done){
            request.get('/api/items')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
    });

    describe('GET', function(){
        it('Se pasa una query y devuelve un listado', function(done){
            request.get('/api/items?q=some%20query')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});

describe('Obtencion de un item + descripción', function() {
    describe('GET', function(){
        it('ID existente', function(done){
            request.get('/api/items/MLA1110149846')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET', function(){
        it('SeID inexistente', function(done){
            request.get('/api/items/ID')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
    });
});