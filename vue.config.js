module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/goods', function(req, res) {
          res.json({
            code: 0,
            slider: [
              {
                id: 21,
                img: '/img/01.jpg'
              },
              {
                id: 22,
                img: '/img/02.jpg'
              },
              {
                id: 23,
                img: '/img/03.jpg'
              },
              {
                id: 24,
                img: '/img/04.jpg'
              }
            ],
            data: {
              fruits: [
                {
                  id: 1,
                  title: '海南小台芒',
                  price: '6.9',
                  img: '/img/01.jpg',
                  count: 468
                },
                {
                  id: 2,
                  title: '水果西红柿',
                  price: '23.8',
                  img: '/img/03.jpg',
                  count: 592
                },
                {
                  id: 3,
                  title: '泰国龙眼',
                  price: '26.8',
                  img: '/img/02.jpg',
                  count: 632
                },
                {
                  id: 4,
                  title: '海南哈密瓜',
                  price: '15.9',
                  img: '/img/04.jpg',
                  count: 541
                },
                {
                  id: 5,
                  title: '红心猕猴桃',
                  price: '19.8',
                  img: '/img/05.jpg',
                  count: 329
                }
                // {
                //   id: 6,
                //   title: '没想好',
                //   price: '30',
                //   img: '/img/05.jpg',
                //   count: 100
                // }
              ]
            },
            keys: ['fruits']
          })
        })

        app.get('/api/login', function(req, res) {
          const { username, password } = req.query
          if (username === 'apple' && password === '123456') {
            res.json({
              code: 0,
              token: 'xxx'
            })
          } else {
            res.json({
              code: 1,
              message: '用户名或密码错误'
            })
          }
        })

        app.get('/api/logout', function(req, res) {
          res.json({ code: -1 })
        })
      }
    }
  }
}
