var http = require('http')
describe('http',()=>{
	var expect_ = expect
	let server
	// beforeAll(()=>{
		// server = run(3003)
	// })
	it('GET /admin',async ()=>{
		
		await http.get({
		  hostname: 'localhost',
		  port: 8086,
		  path: '/admin/'
		}, (res)=>{
			expect(res.statusCode).toEqual(200)
			return
		})
		
	})
	// afterAll(async ()=>{
		// server.close()
	// })
})