const express = require('express');
const strings = require('./lib/strings');
const numbers = require('./lib/numbers');
const arrays = require('./lib/arrays');
const booleans = require('./lib/booleans');
const app = express();

app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
    res.send({ result: strings.sayHello(req.params.string) });
    res.status(200);
});
app.get('/strings/upper/:string', (req, res) => {
    res.send({ result: strings.uppercase(req.params.string) });
    res.status(200);
});
app.get('/strings/lower/:string', (req, res) => {
    res.send({ result: strings.lowercase(req.params.string) });
    res.status(200);
});
app.get('/strings/first-character/:string', (req, res) => {
    res.send({ result: strings.firstCharacter(req.params.string) });
    res.status(200);
});
app.get('/strings/first-characters/:string', (req, res) => {
    res.send({ result: strings.firstCharacters(req.params.string, req.query.length) });
    res.status(200);
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        res.status(400).send({ error: 'Parameters must be valid numbers.' });
    } else {
        res.status(200).send({ result: numbers.add(a, b) });
    }
});
app.get('/numbers/subtract/:a/from/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        res.status(400).send({ error: 'Parameters must be valid numbers.' });
    } else {
        res.status(200).send({ result: numbers.subtract(b, a) });
    }
});
app.post('/numbers/multiply', (req, res) => {
    if (!req.body.a || !req.body.b) {
        res.status(400).send({ error: 'Parameters "a" and "b" are required.' })
    }
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    if (isNaN(a) || isNaN(b)) {
        res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
    } else {
        res.status(200).send({ result: numbers.multiply(a, b) });
    }
});
app.post('/numbers/divide', (req, res) => {
    if (req.body.a == null || req.body.b == null) {
        res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
    }

    const a = Number(req.body.a);
    const b = Number(req.body.b);

    if (b === 0) {
        res.status(400).json({ error: 'Unable to divide by 0.' });
    } else if (isNaN(a) || isNaN(b)) {
        res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
    } else {
        res.status(200).json({ result: numbers.divide(a, b) });
    }
});

app.post('/numbers/remainder', (req, res) => {
    if (req.body.a == null || req.body.b == null) {
        res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
    }

    const a = Number(req.body.a);
    const b = Number(req.body.b);

    if (b === 0) {
        res.status(400).json({ error: 'Unable to divide by 0.' });
    } else if (isNaN(a) || isNaN(b)) {
        res.status(400).json({ error: 'Parameters must be valid numbers.' });
    } else {
        res.status(200).json({ result: numbers.remainder(a, b) });
    }
});


app.post('/arrays/element-at-index/:num', (req, res) => {
    res.status(200).json({ result: arrays.getNthElement(req.params.num, req.body.array) })
});
app.post('/arrays/to-string', (req, res) => {
    res.status(200).json({ result: arrays.arrayToCSVString(req.body.array) })
});
app.post('/arrays/append', (req, res) => {
    res.status(200).json({ result: arrays.addToArray2(req.body.value, req.body.array) })
});
app.post('/arrays/remove-element', (req, res) => {
    if (!req.query.index) {
        res.status(200).json({ result: arrays.removeNthElement2(0, req.body.array) })
    }
    res.status(200).json({ result: arrays.removeNthElement2(req.query.index, req.body.array) })
});
app.post('/arrays/starts-with-vowel', (req, res) => {
    res.status(200).json({ result: arrays.elementsStartingWithAVowel(req.body.array) })
});

app.post('/booleans/negate', (req, res) => {
    res.status(200).json({ result: booleans.negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
    res.status(200).json({ result: booleans.truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
    if (isNaN(req.params.number)) {
        res.status(400).json({ error: 'Parameter must be a number.' });
    }
    res.status(200).json({ result: booleans.isOdd(req.params.number) });
});

app.get('/booleans/:string/starts-with/:char', (req, res) => {
    if (req.params.char.length > 1) {
        res.status(400).json({ error: 'Parameter "character" must be a single character.' });
    }
    res.status(200).json({ result: booleans.startsWith(req.params.char, req.params.string) });
});
module.exports = app;
