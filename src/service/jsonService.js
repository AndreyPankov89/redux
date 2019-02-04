export default class JsonService{


    async getResource(){
        const res = await fetch('http://localhost:3000/numbers');

        if (!res.ok){
            throw new Error ('cannot fetch db.json');
        }

        console.log('get res')
        return await res.json();
    }

    getJson(){
        return this.getResource();
    }

    async postData(data){
        const post = await fetch('http://localhost:3000/numbers',{
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        })
        post.json()
        .then(()=>{console.log('ok')})
        .catch((error) =>{
            console.log('request failed ', error)
        })
    }

}