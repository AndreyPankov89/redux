export default class JsonService{


    async getLastId(){
        const res = await fetch('http://localhost:3004/numbers');

        if (!res.ok){
            throw new Error ('cannot fetch db.json');
        }

        console.log('get res')
        return await res.json().then((res) =>{
            return res[res.length-1].id
        });
    }

    async postData(data){
        const post = await fetch('http://localhost:3004/numbers',{
            method:"POST",
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