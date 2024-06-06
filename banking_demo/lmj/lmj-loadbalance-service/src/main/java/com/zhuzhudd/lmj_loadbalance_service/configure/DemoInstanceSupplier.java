package com.zhuzhudd.lmj_loadbalance_service.configure;

import java.util.List;

import org.springframework.cloud.client.DefaultServiceInstance;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;

import reactor.core.publisher.Flux;

public class DemoInstanceSupplier implements ServiceInstanceListSupplier{
    // 2024/5/29 ===toczpd============
    // =====if we define the serviceId as final, we'll get a runtime error as bellow!
    // since we must instantiate it with a constructor with parameter.
    // 
    // : Error creating bean with name 'demoInstanceSupplier': 
    // Unsatisfied dependency expressed through constructor parameter 0: 
    // No qualifying bean of type 'java.lang.String' available: 
    // expected at least 1 bean which qualifies as autowire candidate. 
    // Dependency annotations: {}
    // 
    // 2024/5/29 ===toczpd============
    // private final String serviceId;
    private String serviceId;

    //  2024/5/29 ===toczpd============
    // if we remove the final qulifer, then we can remove the constrctor as well
    // and the spring applicaiton runs fine!!!!
    // 
    // public DemoInstanceSupplier(String serviceId){
    //     this.serviceId=serviceId;
    // }

    @Override
    public String getServiceId(){
        return serviceId;
    }

    @Override
    public Flux<List<ServiceInstance>> get() {
        return Flux.just(java.util.Arrays.asList(new DefaultServiceInstance(serviceId+"1", serviceId, "localhost", 8080, false),
        new DefaultServiceInstance(serviceId+"2",serviceId,"localhost",8081,false),
        new DefaultServiceInstance(serviceId+"3", serviceId, "localhost", 8082, false)));
        // throw new UnsupportedOperationException("Unimplemented method 'get'");
    }
}