package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

@WebServlet(name = "LoginController", urlPatterns = {"/LoginController"})
public class LoginController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();

        try {
            // Read JSON body
            BufferedReader reader = request.getReader();
            JsonObject requestData = gson.fromJson(reader, JsonObject.class);
            String countryCode = requestData.get("countryCode").getAsString();
            String contactNo = requestData.get("contactNo").getAsString();

            Session s = HibernateUtil.getSessionFactory().openSession();
            Criteria c = s.createCriteria(User.class);
            c.add(Restrictions.eq("countryCode", countryCode));
            c.add(Restrictions.eq("contactNo", contactNo));

            User user = (User) c.uniqueResult();

            if (user != null) {
                responseObject.addProperty("status", true);
                responseObject.addProperty("userId", user.getId());
                responseObject.add("user", gson.toJsonTree(user));
            } else {
                responseObject.addProperty("status", false);
                responseObject.addProperty("message", "User not found. Please sign up first.");
            }

            s.close();
        } catch (Exception e) {
            e.printStackTrace();
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Server error occurred.");
        }

        response.getWriter().write(gson.toJson(responseObject));
    }
}
