'use strict';
const dotEnv = require('dotenv');
dotEnv.config();

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
   if(process.env.NODE_ENV == "production"){

    /* =============== Start:: Routes section ==================== */ 
      await queryInterface.bulkInsert('routes', [
        {
          name: 'Downtown - Kanombe',
          code: 801,
          city: "kigali",
          startLocation: "-1.9450271,30.0518413",
          endLocation: "-1.997916,30.1416558",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Nyamirambo - Downtown',
          code: 802,
          city: "kigali",
          startLocation: "-1.9816057,30.0458323",
          endLocation: "-1.9460458,30.0559966",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Downtown - kicukiro market',
          code: 803,
          city: "kigali",
          startLocation: "-1.9450271,30.0518413",
          endLocation: "-1.9813202,30.1001867",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Gikondo - Gatenga',
          code: 804,
          city: "kigali",
          startLocation: "-1.9612458,30.073419",
          endLocation: "-1.9847317,30.0693738",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Gatenga - Downtown',
          code: 805,
          city: "kigali",
          startLocation: "-1.9847317,30.0693738",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Gikondo - Downtown',
          code: 806,
          city: "kigali",
          startLocation: "-1.9612458,30.073419",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Downtown - Karuruma',
          code: 807,
          city: "kigali",
          startLocation: "-1.9450271,30.0518413",
          endLocation: "-1.9323694,30.0293888",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Karuruma - Bweramvura',
          code: 808,
          city: "kigali",
          startLocation: "-1.9323694,30.0293888",
          endLocation: "-1.8877724,30.0293903",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'kicukiro - Nyabugogo',
          code: 809,
          city: "kigali",
          startLocation: "-1.9813202,30.1001867",
          endLocation: "-1.9273934,30.0292509",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Nyamirambo - Nyabugogo',
          code: 810,
          city: "kigali",
          startLocation: "-1.9816057,30.0458323",
          endLocation: "-1.9273934,30.0292509",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Kabuga - Downtown',
          code: 811,
          city: "kigali",
          startLocation: "-1.9766317,30.21502",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Gisozi - Downtown',
          code: 812,
          city: "kigali",
          startLocation: "-1.9178954,30.0451755",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Batsinda - Downtown',
          code: 813,
          city: "kigali",
          startLocation: "-1.9041042,30.0794015",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Kagugu - Downtown',
          code: 814,
          city: "kigali",
          startLocation: "-1.9121208,30.0869227",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Kagugu - Kimironko',
          code: 815,
          city: "kigali",
          startLocation: "-1.9121208,30.0869227",
          endLocation: "-1.9498715,30.1225508",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Gacuriro - Downtown',
          code: 816,
          city: "kigali",
          startLocation: "-1.9334076,30.0958583",
          endLocation: "-1.9450271,30.0518413",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Bugesera - Nyanza',
          code: 817,
          city: "kigali",
          startLocation: "-2.1124221,30.0475503",
          endLocation: "-2.1123953,29.8373832",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Nyanza - Nyabugogo',
          code: 818,
          city: "kigali",
          startLocation: "-2.1123953,29.8373832",
          endLocation: "-1.9273934,30.0292509",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Rebero - downtown',
          code: 819,
          city: "kigali",
          startLocation: "-2.0003537,30.0696273",
          endLocation: "-1.9460458,30.0559966",
          duration: "30",
          distance: "10" 
        },
        {
          name: 'Rebero - kabeza',
          code: 820,
          city: "kigali",
          startLocation: "-2.0003537,30.0696273",
          endLocation: "-1.971015,30.125922",
          duration: "30",
          distance: "10" 
        }
      ], 
      {});
    /* =============== End:: Routes section ==================== */


    /* =============== Start:: Buses section ==================== */ 
      await queryInterface.bulkInsert('buses', [
        {
          bustype: 'Coaster',
          routecode: 806,
          platenumber:"RAD012D",
          routeId: 7
        }
        ,
        {
          bustype: 'Coaster',
          routecode: 806,
          platenumber:"RAD012X",
          routeId: 7
        }
        ,
        {
          bustype: 'YUTONG',
          routecode: 806,
          platenumber:"RAD012F",
          routeId: 7
        }
        ,
        {
          bustype: 'YUTONG',
          routecode: 806,
          platenumber:"RAF012B",
          routeId: 7
        }
        ,
        {
          bustype: 'YUTONG',
          routecode: 806,
          platenumber:"RAF012F",
          routeId: 7
        }
        ,
        {
          bustype: 'YUTONG',
          routecode: 806,
          platenumber:"RAF012CG",
          routeId: 7
        }
        ,
        {
          bustype: 'RITICO',
          routecode: 808,
          platenumber:"RAF0092B",
          routeId: 9
        }
        ,
        {
          bustype: 'RITICO',
          routecode: 808,
          platenumber:"RAF012D",
          routeId: 9
        }
        ,
        {
          bustype: 'RITICO',
          routecode: 808,
          platenumber:"RAF023D",
          routeId: 9
        }
        ,
        {
          bustype: 'Coaster',
          routecode: 810,
          platenumber:"RAD001Y",
          routeId: 9
        }
        ,
        {
          bustype: 'Coaster001',
          routecode: 810,
          platenumber:"RAD002Y",
          routeId: 9
        }
        ,
        {
          bustype: 'Coaster',
          routecode: 810,
          platenumber:"RAD003Y",
          routeId: 9
        },
        {
          bustype: 'Coaster',
          routecode: 811,
          platenumber:"RAD005Y",
          routeId: 10
        },
        {
          bustype: 'Coaster',
          routecode: 811,
          platenumber:"RAD006Y",
          routeId: 10
        },
        {
          bustype: 'Coaster',
          routecode: 812,
          platenumber:"RAD007Y"
        },
        {
          bustype: 'Coaster',
          routecode: 812,
          platenumber:"RAD008Y"
        },
        {
          bustype: 'Coaster',
          routecode: 812,
          platenumber:"RAD009Y"
        },
        {
          bustype: 'Coaster',
          routecode: 813,
          platenumber:"RAD0010Y",
        },
        {
          bustype: 'Coaster',
          routecode: 813,
          platenumber:"RAD0011Y"
        },
        {
          bustype: 'Coaster',
          routecode: 813,
          platenumber:"RAD012Y"
        }
      ], 
      {});
    /* =================== ENd:: Buses section ==================== */

  
    /* =============== Start:: User section ==================== */ 
      await queryInterface.bulkInsert('users', 
        [
          {
            fullname: 'techcoders',
            username: 'techcoders',
            telephone: '07884984564',
            password: '123456789',
            userType: 'Admin',
            roleId:1,
            email: 'techcoders.andela@gmail.com'
          },
          {
            fullname: 'Sezerano Jean chrysostome',
            username: 'chrisostome',
            telephone: '07884984564',
            password: '123456789',
            userType: 'Driver',
            roleId: 3,
            email: 'sezeranochrisostom123@gmail.com'
          },
          {
            fullname: 'Sezerano Jean chrysostome',
            username: 'chrisostome',
            telephone: '07884984564',
            password: '123456789',
            userType: 'Driver',
            roleId: 3,
            email: 'sezeranochrysostom123@gmail.com'
          },
          {
            fullname: 'Chance desire',
            username: 'Desire',
            telephone: '07884984564',
            password: '123456789',
            userType: 'Operator',
            roleId:2,
            email: 'chancedesire60@gmail.com'
          },
          {
            fullname: 'Chance perator2',
            username: 'Desire2',
            telephone: '07884984564',
            password: '123456789',
            userType: 'Operator',
            roleId:2,
            email: 'chancedesire61@gmail.com'
          },
        ], 
      {});
   /* =============== End:: User section ======================= */ 

  /* ================== Start:: Create drivers ================== */  
    await queryInterface.bulkInsert('drivers', [{
      userId:5, 
      busId:1, 
      driversLicense: 'license'
    }], {});
    
    await queryInterface.bulkInsert('drivers', [{
      userId:6, 
      busId:2, 
      driversLicense: 'license'
    }], {});
  /* ================= End:: create drivers ====================== */
  
   /* ================== Start:: Create OPerator ================== */  
  await queryInterface.bulkInsert('operators', [{
    userId:6, 
    location:'Kicukiro'
  }], {});
  await queryInterface.bulkInsert('operators', [{
    userId:7, 
    location:'Kicukiro'
  }], {});
   /* ================== Start:: Create Operator ================== */  

}  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     * 
     */
    
     
  }
};
