body = {
    "name": null,
    "phone": null
}

Valid = (Map)=>{

    if(Map.name == null && Map.phone == null ){
        return"name and phone not valid"
    }
else if(Map.name ==null  || Map.name  ==" " ){
    return"name not valid"
}
else if(Map.phone == null || Map.phone == " " ){
    return"phone not valid"
}

else 
return"true"

}

console.log(Valid(body)); 