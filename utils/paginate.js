export const paginate = (page , size) => {
    const data = {
       page: 0,
       size: 5
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

    return data;
}