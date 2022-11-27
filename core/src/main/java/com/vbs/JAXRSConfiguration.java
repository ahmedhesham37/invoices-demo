package com.vbs;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/resources")
public class JAXRSConfiguration extends Application {
//    private Logger log = LoggerFactory.getLogger(JAXRSConfiguration.class);
//
//   	private Set<Object> singletons = new HashSet<>();
//   	private Set<Class<?>> classes = new HashSet<>();
//
//   	public JaxRsActivator() {
//   		Reflections reflections = new Reflections("com.vbs");
//   		classes.addAll(reflections.getSubTypesOf(BaseResource.class));
//
//   		log.debug("Instantiating {} rest services...", classes.size());
//
//   		log.debug("Wiring {} rest singletons...", singletons.size());
//   	}
//
//   	@Override
//   	public Set<Object> getSingletons() {
//   		return singletons;
//   	}
//
//   	@Override
//   	public Set<Class<?>> getClasses() {
//   		return classes;
//   	}

}
