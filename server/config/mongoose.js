let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chargen');
mongoose.set({ debug: true});