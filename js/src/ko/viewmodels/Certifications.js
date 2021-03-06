const
    ko = require('../../../lib/knockout-latest'),
    _ = require('lodash');

module.exports = function CertificationsModel(services, attributes) {
    console.log(services, services.certificationService);
    const vm = {
        attributes: attributes,
        certifications: ko.observableArray([]),
        selectedCertifications: ko.observableArray([])
    };

    vm.selectedCertifications.subscribe((newVal, oldVal) => {
        services.productService.get({ certifications: newVal });
    });
    // listen for when the product service returns a list of products, will also work for paging 
    services.certificationService.subscriptions.onGet((certifications, env) => {
        vm.certifications.removeAll();
        _.each(certifications, (certification) => vm.certifications.push(certification));
    });
    
    _.defer(() => services.certificationService.get({}));
    return vm;
};