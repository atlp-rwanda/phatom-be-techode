export const paginate = (page , size , order = null) => {
    
    const data = {
       page: 0,
       size: 5,
       order: "asc"
    }
    const pageNumber = Number(page);
    /* c8 ignore next 3 */ 
    if(pageNumber && pageNumber > 0){
        data.page = pageNumber;
    }
    const sizeNumber = Number(size);
    /* c8 ignore next 3 */ 
    if(sizeNumber && sizeNumber > 0 && sizeNumber < 10){
        data.size = sizeNumber;
    }

    /* c8 ignore next 3 */ 
    if( order == "desc" ){
        data.order = order;
    }

    return data;
}