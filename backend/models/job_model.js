
module.exports = function(app, db) {
    
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var jobSchema = new Schema({

        title:          String,
        description:    String,
        posted:         Date,
        sector:         String,
        location:       String,
        salary:         Number,
        salaryType:     String

    });

    const job = Mongoose.model("job", jobSchema);

});
