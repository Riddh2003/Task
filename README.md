backend
--->src
  ---> Controller
      --->AuthContoller.js
      --->ProjectController.js
  --->Middleware
      ---> AuthMiddleware.js
  --->Model
      ---> ProjectModel.js
      ---> UserModel.js
  ---> routes
      --->AuthRoute.js
      --->ProjectRoute.js
  --->Utils
      --->EncryptUtil.js
      --->TokenUtil.js
--->app.js

Frontend
    ---> app
        --->store.js
    ---> components
        --->ProtectedRoute.js
    ---> features
        ---> auth
            --->authSlice.js
            --->Loginpage.jsx
        ---> projects
            --->projectSlice.js
            --->Dashboard.jsx
    ---> pages
        ---> NotFound.jsx


Add manually data in project table:
{
    "title": "Project 1",
    "description": "Project 1 description",
    "admin":"adminid",
    "status":"active"
}

Add Admin data manually in admin table:
{
    "name":"Admin",
    "email":"EMAIL",
    "password":"PASSWORD"
    "gender":"male",
    "status":"active"
}

**NOTE : When you run both project then login page open after loginn it navigate to dashboard.**
