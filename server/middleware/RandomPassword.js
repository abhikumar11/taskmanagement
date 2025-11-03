const generatePassword=()=>{
    let pass="";
    const str="aB92xLk7RtY5mZq3hN1pWd8CsGfTjE6vQb9rHu4PoXSa";
    for(let i=1;i<=8;i++){
        const index=Math.trunc(Math.random()*str.length);
        pass+=str.charAt(index);
    }
    return pass;
}
module.exports={generatePassword};