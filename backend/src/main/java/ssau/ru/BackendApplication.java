package ssau.ru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.Transactional;
import ssau.ru.cars.*;
import ssau.ru.cars.Car;
import ssau.ru.cars.FuelType;
import ssau.ru.graph.*;
import ssau.ru.users.DriveStyle;
import ssau.ru.users.PathUser;
import ssau.ru.users.PathUserRepository;

@SpringBootApplication
@EnableCaching
public class BackendApplication implements CommandLineRunner {
    @Autowired
    public BackendApplication(PathUserRepository userRepository, PathGraphRepository graphRepository,
                              PathNodeRepository nodeRepository, PathEdgeRepository edgeRepository,
                              CarRepository carRepository, CarBrandRepository carBrandRepository,
                              FuelTypeRepository fuelTypeRepository, CoverTypeRepository coverTypeRepository, StreetRepository streetRepository) {
        this.userRepository = userRepository;
        this.graphRepository = graphRepository;
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
        this.carRepository = carRepository;
        this.carBrandRepository = carBrandRepository;
        this.fuelTypeRepository = fuelTypeRepository;
//        this.pathStreetRepository = pathStreetRepository;
        this.coverTypeRepository = coverTypeRepository;
        this.streetRepository = streetRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	private final PathUserRepository userRepository;

    private final PathGraphRepository graphRepository;

    private final PathNodeRepository nodeRepository;

    private final PathEdgeRepository edgeRepository;

    private final CarBrandRepository carBrandRepository;

    private final FuelTypeRepository fuelTypeRepository;

    private final CarRepository carRepository;

    private final CoverTypeRepository coverTypeRepository;

    private final StreetRepository streetRepository;

//    private final PathStreetRepository pathStreetRepository;



	@Override
    @Transactional
	public void run(String... args) throws Exception {
	    PathUser user = new PathUser();
        user.setUsername("diman");
        user.setPassword("diman");
        user.setRoles(new String[] {"ROLE_ADMIN", "ROLE_USER"});
        user.setDriveStyle(DriveStyle.LAW_ABIDING);

        userRepository.save(user);

        PathGraph graph = new PathGraph("graph1");
        graph.setOwner(user);

        PathNode node = new PathNode(graph, new PathNode.PathLight(15, 20), new PathNode.NodePosition(100, 10));
        graph.addNode(node);
        node.setGraph(graph);

        PathNode node1 = new PathNode(graph, new PathNode.PathLight(15, 15), new PathNode.NodePosition(100, 100));
        graph.addNode(node1);
        node1.setGraph(graph);

        PathNode node2 = new PathNode(graph, null, new PathNode.NodePosition(100, 150));
        graph.addNode(node2);
        node2.setGraph(graph);

        CoverType coverType = new CoverType();
        coverType.setCoverTypeName("Breakstone");
        coverType.setSlowdown(0.87);

        CoverType cT = new CoverType();
        cT.setCoverTypeName("Asphalt");
        cT.setSlowdown(0.56);

        Street street = new Street();
        street.setStreetType("улица");
        street.setStreetName("Ленина");

        PathEdge edge = new PathEdge(graph, node, node1);
        edge.setCoverType(coverType);
        edge.setLimit(60);
        edge.setLength(100);
        edge.setStreet(street);
        edge.setLanes(3);
        graph.addEdge(edge);
        edge.setGraph(graph);

        PathEdge edge1 = new PathEdge(graph, node1, node2);
        edge1.setCoverType(coverType);
        edge1.setLimit(110);
        edge1.setLength(100);
        edge1.setDirected(true);
        edge1.setLanes(4);
        graph.addEdge(edge1);
        edge1.setGraph(graph);

        userRepository.save(user);
        coverTypeRepository.save(coverType);
        coverTypeRepository.save(cT);
        streetRepository.save(street);
        graphRepository.save(graph);
        nodeRepository.save(node);
        nodeRepository.save(node1);
        edgeRepository.save(edge);
        edgeRepository.save(edge1);

//        List<PathUser> users = new ArrayList<>();
//
//        for (int i = 0; i < 50; i++) {
//            users.add(new PathUser("dima" + i, "dima", style2));
//        }
//
//        userRepository.save(users);

        for (PathUser u : userRepository.findAll()) {
            System.out.println(u.getUsername() + " : " + u.getPathGraphs());
        }

        CarBrand brand = new CarBrand("BMP1");
        ssau.ru.cars.FuelType fuelType = new FuelType("GAS", 10.0);
        Car car = new Car();
        car.setName("X6");
        car.setBrand(brand);
        car.setFuelType(fuelType);
        car.setMaxVelocity(222);
        car.setFuelConsumption(15.0);

        carBrandRepository.save(brand);
        fuelTypeRepository.save(fuelType);
        //user.setOwnCars(Collections.singletonList(car));
        carRepository.save(car);

       // car.setOwners(Collections.singletonList(user));

//        PathStreet street1 = new PathStreet();
//        street1.setName("Ленина");
//        street1.setType(PathStreet.StreetType.STREET);
//
//        pathStreetRepository.save(street1);
    }
}
