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
import ssau.ru.users.DriveStyleRepository;
import ssau.ru.users.PathUser;
import ssau.ru.users.PathUserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableCaching
public class BackendApplication implements CommandLineRunner {
    @Autowired
    public BackendApplication(PathUserRepository userRepository, PathGraphRepository graphRepository,
                              PathNodeRepository nodeRepository, PathEdgeRepository edgeRepository,
                              CarRepository carRepository, CarBrandRepository carBrandRepository,
                              FuelTypeRepository fuelTypeRepository, DriveStyleRepository driveStyleRepository) {
        this.userRepository = userRepository;
        this.graphRepository = graphRepository;
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
        this.carRepository = carRepository;
        this.carBrandRepository = carBrandRepository;
        this.fuelTypeRepository = fuelTypeRepository;
        this.driveStyleRepository = driveStyleRepository;
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

    private final DriveStyleRepository driveStyleRepository;

	@Override
    @Transactional
	public void run(String... args) throws Exception {
        DriveStyle style1 = new DriveStyle("economy");
        DriveStyle style2 = new DriveStyle("fire");

        driveStyleRepository.save(style1);
        driveStyleRepository.save(style2);

	    PathUser user = new PathUser("diman", "diman", "ROLE_USER", "ROLE_ADMIN");
        user.setDriveStyle(style1);

        PathGraph graph = new PathGraph();
        user.addPathGraph(graph);
        graph.setOwner(user);

        PathNode node = new PathNode(graph, new PathNode.PathLight(15, 20), new PathNode.NodePosition(0, 10));
        graph.addNode(node);
        node.setGraph(graph);

        PathNode node1 = new PathNode(graph, new PathNode.PathLight(15, 15), new PathNode.NodePosition(100, 100));
        graph.addNode(node1);
        node1.setGraph(graph);

        PathEdge edge = new PathEdge(graph, node, node1);
        edge.setCoverType(CoverType.BREAKSTONE);
        edge.setLength(100);
        edge.setLanes(3);
        graph.addEdge(edge);
        edge.setGraph(graph);

        userRepository.save(user);
        graphRepository.save(graph);
        nodeRepository.save(node);
        nodeRepository.save(node1);
        edgeRepository.save(edge);

        List<PathUser> users = new ArrayList<>();

        for (int i = 0; i < 50; i++) {
            users.add(new PathUser("dima" + i, "dima", style2));
        }

        userRepository.save(users);

        for (PathUser u : userRepository.findAll()) {
            System.out.println(u.getUsername() + " : " + u.getPathGraphs());
        }

        CarBrand brand = new CarBrand("BMP");
        ssau.ru.cars.FuelType fuelType = new FuelType("GAS", 10.0);
        //Car car = new Car(brand, "X56", 180, fuelType, 10.0);

        carBrandRepository.save(brand);
        fuelTypeRepository.save(fuelType);
        //carRepository.save(car);
    }
}
