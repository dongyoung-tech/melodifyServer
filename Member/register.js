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

const handleRegister = async(req, res) => {

  const { id, pass, name } = req.body;
  try {
    const conn = await pool.getConnection();
    const duplicateCheck = await conn.query("SELECT * FROM member WHERE id = ?", [id]);
    const duplicateNameCheck = await conn.query("SELECT * FROM member WHERE name = ?", [name]);
    conn.release();

    if (duplicateCheck.length > 0) {
      return res.status(200).json({ message: '이미 사용중인 아이디 입니다' });
    }
    else if(duplicateNameCheck.length>0){
      return res.status(200).json({ message: '이미 사용중인 닉네임 입니다' });
    }
  } catch (error) {
    console.error('Error while checking for duplicate ID:', error);
    return res.status(500).send('Error while checking for duplicate ID.');
  }

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
