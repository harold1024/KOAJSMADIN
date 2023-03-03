const config = {
	server:{
		port:process.env.SERVER_PORT
	},
	db:{
		db_host:process.env.DB_HOST,
		db_name:process.env.DB_NAME,
		db_user:process.env.DB_USER||'',
		db_port:process.env.DB_PORT||'8087',
		db_pwd:process.env.DB_PASSWORD||''
	},
	log:{
        appenders: {  
            fileout: { type: "file", filename: "logs/fileout.log",maxLogSize: 1*1024*1024 }, 
            datafileout: {
                type: "dateFile", 
                filename: "datafileout.log", 
                pattern: ".yyyy-MM-dd-hh-mm-ss-SSS"
            },
            consoleout: { type: "console" }, 
			access:{type:'file',filename:'logs/cheese.log',maxLogSize: 1*1024*1024}
        }, 
        categories: {  
            default: { appenders: ["fileout", "consoleout"], level: "debug" },   
            anything: { appenders: ["consoleout"], level: "debug" },
			access: { appenders: ["access"], level: "info" }
        }
    },
    jwt:{
        jwt_secret:process.env.JWT_SECRET,
        jwt_expire:process.env.JWT_EXPIRE
    },
    static:{
        path:process.env.STATIC_PATH
    }
}
module.exports =  config