export const paginate = (page , size , order = null) => {
    const data = {
       page: 0,
       size: 5,
       order: "asc"
    }
    const pageNumber = Number.parseInt(page);
    /* c8 ignore next 3 */ 
    if(!Number.isNaN(pageNumber) && pageNumber > 0){
        data.page = pageNumber;
    }
    const sizeNumber = Number.parseInt(size);
    /* c8 ignore next 3 */ 
    if(!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 10){
        data.size = sizeNumber;
    }

    /* c8 ignore next 3 */ 
    if( order == "desc" ){
        data.order = order;
    }

    return data;
}