package dopomogaua.repository;

import org.springframework.stereotype.Repository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@Repository
public class FileSystemRepository {

    String RESOURCES_DIR = "https://dopomoga-ua.herokuapp.com/img";

//    String RESOURCES_DIR = "D:\\IT\\Projects\\help-ua\\img\\";


    public String save(byte[] content, String imageName) throws Exception {
        Path newFile = Paths.get(RESOURCES_DIR + "/" + imageName);
        Files.createDirectories(newFile.getParent());

        Files.write(newFile, content);

        return newFile.toAbsolutePath()
                .toString();
    }
}