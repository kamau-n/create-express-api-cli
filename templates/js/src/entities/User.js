const { EntitySchema } = require("typeorm");

module.exports = {
    User: new EntitySchema({
        name: "User",
        tableName: "users",
        columns: {
            id: {
                type: Number,
                primary: true,
                generated: true,
            },
            email: {
                type: String,
                unique: true,
            },
            password: {
                type: String,
            },
        },
    }),
};