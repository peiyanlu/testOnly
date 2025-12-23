import IP2Region from 'ip2region'


const ip = '127.0.0.1'

const query = new IP2Region()
const ipAddress = query.search(ip)


console.log('>>> ipAddress:', ipAddress)
// >>> ipAddress: { country: '', province: '', city: '内网IP', isp: '内网IP' }


