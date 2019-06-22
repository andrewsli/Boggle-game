from app import app
from flask import session
import unittest

class MyTest(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True
    
    def test_index(self):
        result = self.client.get('/')
        self.assertEqual(result.status_code, 200)
        self.assertIn(b'Score', result.data)
        #self.assertIsInstance(session["letters_board"], list)

    def test_index_session(self):
        with self.client:
            response = self.client.get('/')
            self.assertIsInstance(session['letters_board'], list)
    
    def test_handle_guess(self):
        # test status code = 200
        # returns json
        # result = self.client.get('/check-word')
        # self.assertEqual(result.status_code, 200)
        # self.assertIsInstance(self.app.get('/check-word', query_string={"guess":"cat"}), str)
        # with self.client as c:
        #     rv = c.get('/check-word?guess=cab') # how do we pass in a set board though? so we know if this word is valid or not
        #     self.assertEqual(request.args['guess'], "ok")
   