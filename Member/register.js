import multer from 'multer';
import mariadb from 'mariadb';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 이미지가 저장될 디렉토리
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

const pool = mariadb.createPool({
  host: 'svc.sel5.cloudtype.app',
  user: 'root',
  password: 'Ehddud23!@',
  database: 'MyMusic',
  port: 30633,
  connectionLimit: 5 
});

const handleRegister = (req, res) => {

  const { id, pass, name } = req.body;

  let profileImagePath ="null";
  if(req.file) profileImagePath = 'uploads/' + req.file.filename; // 프로필 이미지 파일 경로

  pool.getConnection()
    .then(conn => {
      const insertQuery = `INSERT INTO member (id, password, name, profile) VALUES (?, ?, ?, ?)`;
      console.log(insertQuery); // 쿼리 출력

      return conn.query(insertQuery, [id, pass, name, profileImagePath])
        .then(result => {
          conn.release(); // 연결 해제
          res.status(200).send('Registered successfully.');
          console.log(result); // 쿼리 결과 출력
        })
        .catch(error => {
          conn.release(); // 연결 해제
          console.error('Error while registering:', error);
          res.status(500).send('Error while registering.');
        });
    })
    .catch(err => {
      console.error('Error connecting to the database:', err);
      res.status(500).send('Error connecting to the database.');
    });
};


export { handleRegister, upload };
