export const ApiConfig = {
    //unsecure
    getAccessToken: 'user/unsecure/access/token',
    getRefreshToken: 'user/unsecure/token',
    saveConsumer: 'user/scrap/save',
    //consumer
    saveConsumerAddress: 'user/consumer/address',
    saveConsumerProducts: 'user/consumer/product',
    getAllConsumers: 'user/consumer/',
    getConsumerById: 'user/consumer/{id}',
    //category
    getAllCategories: 'product/category',
    saveCategory: 'product/category/',
    getCategoryById: 'product/category/{id}',
    saveProductsByCategoryId: 'product/category/{id}/product',
    //stock
    saveInventory: 'order/scrap',
    getInventoriesBySellerId: 'order/scrap/seller/{id}',
    getInventoriesByCoordinates: (lat, lng) => {
        return 'order/scrap/location/lat/' + lat + '/lon/' + lng;
    }
};
