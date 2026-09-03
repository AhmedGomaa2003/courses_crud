# Courses CRUD API

## 📌 وصف المشروع

هذا المشروع هو REST API تم بناؤه باستخدام Node.js و Express.js و MongoDB لإدارة الكورسات والمستخدمين، مع دعم:

- إدارة الكورسات (إنشاء - قراءة - تحديث - حذف)
- تسجيل المستخدمين وتسجيل الدخول
- JWT Authentication
- التحقق من المدخلات باستخدام express-validator
- التعامل مع الأخطاء عالميًا
- نظام Pagination للعرض
- حماية بعض المسارات باستخدام Token

---

## 🚀 التقنيات المستخدمة

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Json Web Token)
- bcryptjs
- express-validator
- dotenv
- cors
- nodemon

---

## ✅ المميزات التي تم تنفيذها

### 1) إدارة الكورسات

- الحصول على كل الكورسات
- الحصول على كورس واحد حسب ID
- إضافة كورس جديد
- تحديث كورس موجود
- حذف كورس
- Pagination عبر query params مثل:
  - limit
  - page

### 2) إدارة المستخدمين

- تسجيل مستخدم جديد
- تسجيل دخول مستخدم
- عرض جميع المستخدمين
- حذف مستخدم
- تشفير كلمة المرور باستخدام bcryptjs
- إنشاء JWT بعد التسجيل أو تسجيل الدخول

### 3) حماية المسارات

- تم إنشاء middleware للتحقق من Token
- بعض المسارات محمية ومش ممكن الوصول لها إلا بعد إرسال Bearer Token

### 4) التحقق من البيانات

- التحقق من required fields
- التحقق من نوع سعر الكورس numeric
- التحقق من طول العنوان
- التحقق من صحة البريد الإلكتروني

### 5) معالجة الأخطاء

- Error Handling عالمي
- Route not found
- Unauthorized / Invalid Token
- User not found
- Validation errors

---

## 📁 هيكل المشروع

```bash
courses_crud/
├── controllers/
│   ├── courses.controllers.js
│   └── users.controllers.js
├── middleware/
│   ├── asyncWrapper.js
│   ├── validationSchema.js
│   └── verifyToken.js
├── models/
│   ├── course.model.js
│   └── user.model.js
├── routes/
│   ├── coursesRoutes.js
│   └── usersRoutes.js
├── utils/
│   ├── appError.js
│   ├── generatejwt.js
│   └── httpStatusText.js
├── .env
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ إعداد البيئة

أنشئ ملف `.env` في جذر المشروع واضف المتغيرات التالية:

```env
port=4000
uri_DB=mongodb://localhost:27017/courses_db
jwt_secret=your_secret_key
```

> تأكد من تشغيل MongoDB على الجهاز المحلي أو استخدام Connection String مناسب.

---

## ▶️ طريقة التشغيل

```bash
npm install
npm start
```

أو إذا كنت تستخدم nodemon مباشرة:

```bash
npx nodemon index.js
```

---

## 🔗 Endpoints

### 1) الكورسات

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| GET    | /api/courses           | عرض كل الكورسات |
| POST   | /api/courses           | إضافة كورس جديد |
| GET    | /api/courses/:courseId | عرض كورس واحد   |
| PATCH  | /api/courses/:courseId | تحديث كورس      |
| DELETE | /api/courses/:courseId | حذف كورس        |

### 2) المستخدمين

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | /api/users          | عرض كل المستخدمين (محمي) |
| DELETE | /api/users/:usersId | حذف مستخدم (محمي)        |
| POST   | /api/users/register | تسجيل مستخدم جديد        |
| POST   | /api/users/login    | تسجيل دخول               |

---

## 🧪 مثال على طلبات API

### إضافة كورس

```http
POST /api/courses
Content-Type: application/json

{
  "title": "Node.js Basics",
  "price": 250
}
```

### تسجيل مستخدم

```http
POST /api/users/register
Content-Type: application/json

{
  "firstname": "Ahmed",
  "lastname": "Ali",
  "email": "ahmed@example.com",
  "password": "123456"
}
```

### تسجيل دخول

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "123456"
}
```

### استخدام الـ Token

```http
GET /api/users
Authorization: Bearer <your_token>
```

---

## 🧩 ملاحظات مهمة

- عند تسجيل المستخدم يتم تشفير كلمة المرور قبل حفظها في MongoDB
- عند تسجيل الدخول يتم إنشاء JWT يحتوي على email و userId
- جميع الطلبات المحمية تتطلب `Authorization: Bearer token`
- النظام يدعم `Validation` و `Custom Error Handling` بطريقة احترافية
- تم تنظيم المشروع باستخدام `MVC` تقريبًا: Models / Controllers / Routes / Middleware / Utils

---

## 📌 الخلاصة

هذا المشروع يمثل API كامل لإدارة الكورسات والمستخدمين ويحتوي على:

- CRUD operations
- Authentications
- API validation
- Pagination
- Error handling
- Secure user management

إذا رغبت، أستطيع أيضًا إعداد README باللغة العربية/الإنجليزية بشكل أكثر احترافية مع إضافة Screenshots أو Postman Collection examples.
