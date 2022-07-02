import { createPool } from "mysql2/promise";

var pool_ = undefined;

async function connect() {
    if (pool_) {
        return pool_;
    }
    // pool_ = await createPool(
    pool_ = {
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            port: 3306,
            password: "",
            database: "activelearn",
        }
        // )
    return pool_;
}

export default connect;