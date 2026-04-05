package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@MultipartConfig
@WebServlet(name = "EventController", urlPatterns = {"/EventController"})
public class EventController extends HttpServlet {

    private String readPart(Part part) throws IOException {
        InputStream inputStream = part.getInputStream();
        ByteArrayOutputStream result = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length;
        while ((length = inputStream.read(buffer)) != -1) {
            result.write(buffer, 0, length);
        }
        return result.toString("UTF-8"); // or the charset you need
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("Event creating...");

        // Read text fields
        String title = readPart(request.getPart("title"));
        String description = readPart(request.getPart("description"));
        String date = readPart(request.getPart("date"));
        String time = readPart(request.getPart("time"));
        String location = readPart(request.getPart("location"));
        String category = readPart(request.getPart("category"));
        String maxAttendees = readPart(request.getPart("maxAttendees"));

        // Read image
        Part imagePart = request.getPart("image");

        if (imagePart != null && imagePart.getSize() > 0) {
            System.out.println("Image received: " + imagePart.getSubmittedFileName());
        }

        // Print for debugging
        System.out.println(title);
        System.out.println(description);
        System.out.println(date);
        System.out.println(time);
        System.out.println(location);
        System.out.println(category);
        System.out.println(maxAttendees);

        // Send JSON response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write("{\"status\": true, \"message\": \"Event created successfully with image!\"}");
    }

}
