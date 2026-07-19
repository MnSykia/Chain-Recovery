import { Item } from '../types';

export const INITIAL_ITEMS: Item[] = [
  {
    id: "0x82f281a83017a02c918a2e1d743a192c73362198052",
    title: "MacBook Pro 14\" (2023)",
    description: "Sleek space grey finish, 14-inch display, M3 chip. Registered on the Polygon network with hardware hash.",
    category: "Electronics",
    type: "FOUND",
    status: "CLAIMED",
    location: "Terminal 4, JFK",
    date: "2023-10-24",
    reward: "0.05",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOHbzxL-X59bd7xyXnYIfZlvHa6VjzjP6MLfmisHRCqgBmM6N8bN6tRvIpQk23MPBC7_HVS9IwdPEXrCBhepeSiDKiS2u1g1J1f1CI-EGyZ8bPYuttaZh3NjyzIw3Du-LhV0X_L9KqcBLl40cXCJZHjlBMnnUM3KxQj5d36U2C5VxXCFlVMfELlcIMnir9MLFcVBwmx6M_e5GbPBjnnlltBTiUQtjqAi6FDH7aAq1ZAVHvAlY66pir",
    reporter: "0x71C2B4fE95c102E2c53E3f7b2A3C139b8C4c3E1d",
    serialNumber: "Ends in ...77X",
    trustScore: 98.4,
    claims: [
      {
        id: "382",
        claimant: "0x4b78c93a2e1d74c3e800a52d8291a139bc733621",
        claimantName: "Alex Rivera",
        claimantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5zVEEzaAMmRizfH95MR2lCUV7-SwEsYLCgpf0J3_2ccVS56hZqm19nEtrelCEPEI5_PKtBhnhb92BOOYHNY2LEK91ET7gk8cpxdGXoRJ3TAEww0p-ONtgA6lVjMwmxtkuf0xwXbmZRoHjxzLckSMkRA86fN2evQeaa9kT9l28Bi1GNQCaFzGYxlPaaNHlivhVxuTvW3WGZeRPXNWAj_MLzar7SM8SKE4aB5RxzNXzxzKLaNg9vKkF",
        description: "The MacBook has a small sticker of a 'Cyberpunk' logo on the bottom right of the lid. The serial number ends in ...77X. I can also provide the original digital receipt from the Apple Store.",
        status: "PENDING",
        conversation: [
          {
            sender: "finder",
            message: "Can you confirm the color of the protective sleeve it was in?",
            timestamp: "Oct 24, 2023 15:30 UTC"
          },
          {
            sender: "claimant",
            message: "It was in a dark navy blue felt sleeve with a leather clasp.",
            timestamp: "Oct 24, 2023 15:45 UTC"
          }
        ]
      },
      {
        id: "379",
        claimant: "0x812d3490cca0800a52d8291a139bc73362198052",
        claimantName: "User_9281",
        claimantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBSE1i51TZ2P0O90sM0tcTrmeDRM4KZbnQSgQVPdqu8Ra8XiZZRybSkz-ooepQ7HepGAfzTjblnJGg2wWb520sm_6xROguj2FPWXcpYJkUHm7ay1wKeDgMiWcqnf5g3ZMQwq2CMY3WpDWBlUs9-ZN3kmJWKtIFa3JO13QM5utLD_cu6nhwLqM4lUFaXYVkhV2HL1xl8OOMnBzjB2GJWX0j1Y-cCt9f6mlbODgL2Omfyo01s3q5qK98",
        description: "I lost a similar MacBook yesterday. It has a 14-inch screen and is space grey. I don't have the serial number right now but it was definitely mine.",
        status: "PENDING",
        conversation: []
      },
      {
        id: "375",
        claimant: "0x2df1103c800a52d8291a139bc733621980524451",
        claimantName: "Sarah J.",
        claimantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO0GdyMMTlI-LGVmgQ-wautttaLH3MDcXO7s-I5jMFgOsSxm3V8teDUMppKU6je1B5Hr-LvmSaY_uumY9Yobu6f0zAQurOIF3ddU5S_BGADE5EhpiT1HqfVF1Ju719VYFCT_4T4xY1EJKggXFKFGS-d_58QvZQrtmjLp3xke3yRuxVpN073jB6hOQjy9RmrIHmUdWp8fNE70gUTZT2BuHqVoOWogg8gtkeHZOVK4mpXl3Vm_pfJuC8",
        description: "Attached is the insurance document for my laptop which includes the hardware hash registered on the Polygon network last year.",
        status: "PENDING",
        conversation: []
      }
    ]
  },
  {
    id: "0x3b821980524d8eff2d34490c017a02c918a2e1f4",
    title: "MacBook Pro M2",
    description: "MacBook Pro with M2 processor reported lost in Central Park. Space-gray color in mint condition.",
    category: "Electronics",
    type: "LOST",
    status: "REPORTED",
    location: "Central Park Tech Pavilion",
    date: "2023-10-24",
    reward: "0.05",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAShGPgaaI2aCqR8ex2x1TTKJf26XW04kYJmMongel24bhR2-XSkTznBk68WTxsUU50PJ6OWVcKVJPq4qEE2k7vYurgbhqTifVa_tlWYWwHH478SFaAXMQRTcN-m6RfdGXQ7g53ZaRd9w0E68zYkqVM7Rf8j-cUHYNNaP5IMiqpuSbWtcdYXxlJ5RT9aC2oPrA_KCpgGnhXlqbzglBiu3PX19tWSPHzL4mcoJgTysQauzIuaCTXszOP",
    reporter: "0xJD103c800a52d8291a139bc73362198052410bc",
    claims: []
  },
  {
    id: "0x9812a8e1df1103c800a52d8291a139bc73362198",
    title: "Leather Bifold Wallet",
    description: "High-quality brown leather wallet containing bank cards and ID card. Found at Grand Central Terminal.",
    category: "Wallets",
    type: "FOUND",
    status: "REPORTED",
    location: "Grand Central Terminal",
    date: "2023-10-25",
    reward: "0.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzW-dwzhRalqAB3ciuw5zCJYjtsv3fl2vRk-ERhFQaGecwPk7UQ2YYPEmcOYPwQsAn-bhXuRjH4PViZhTXh0Lj_AyrUXBEIo0tjXFy1BZ4kXS5ob2z3AYZqY39wPaVAOAOqZ0CaH2UVYV7FSwoMjXJutfartxnc4so3vcMMfa1eB0nIEKpiQ2rZWDyv1LCrrNaYoVBAxIHwPoYHM5bC0ZqdEHSZ-i2sgy6thpHRs5ijxk5Emp4ls8W",
    reporter: "0x71C2B4fE95c102E2c53E3f7b2A3C139b8C4c3E1d",
    claims: []
  },
  {
    id: "0x52df1103c800a52d8291a139bc73362198052abc",
    title: "Tesla Model S Fob",
    description: "Standard black key fob for Tesla Model S. Found lying on the floor in a parking garage.",
    category: "Keys",
    type: "LOST",
    status: "REPORTED",
    location: "SoHo Parking Garage",
    date: "2023-10-22",
    reward: "0.02",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7ETO4xh13D_2VxCJ-ObzKamNGvHOUrtgsDs0_P95VtvUs7OTg6NMAjbcMJAsWJ41ilvLnmNEHD0WtIyP6tD7iwj3HsqJCizKbdAm1vdu5ozFP-YFD7LBg_uUirJ6cR0oMscSZ_tqYOP7Xi2OSNawSe6Kq4G5-sZFK9DH-m14n4p2oABtiFTecFCHRQNlrfNKEzO6yvOqe7bYMl5djLtB8IC7lx6AW5aCA4iLKjOyIer756aJkjZWO",
    reporter: "0x9c3f3f2d34490c017a02c918a2e1d743a192c73a",
    claims: []
  },
  {
    id: "0x982e2df1103c800a52d8291a139bc7336219805d",
    title: "European Passport",
    description: "Blue passport cover. Critical personal travel document. Needs urgent recovery.",
    category: "Documents",
    type: "LOST",
    status: "REPORTED",
    location: "JFK Terminal 4",
    date: "2023-10-26",
    reward: "0.10",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtZPWm7zfvUUfoXwp_rYeTZuk7Czsc9Rhq6KNZ6fvs0wMHaw1kJ4zo70Ywy6TEh277sMYB3ZiNQKUcubJaeTSuKOvPGJQKktmxDztFZHztLRgWtgxKJ9W96zbFuWubpRKyTcqb_tqMDVHAM8P9AJd-JY209zpi5T1QJ6klefOIPgftOpWfkLQYYChGBnuR2yAho9QknGFyU24xQsHFY1tTKOyuZXpGd6JgyoyDvwnL14dKwiAqCJS3",
    reporter: "0x3e1d2c918a2e1d743a192c733621980524451fff",
    claims: []
  },
  {
    id: "0x7a2d3490cca0800a52d8291a139bc733621984f9b",
    title: "Vintage Rolex Datejust",
    description: "Rolex Datejust featuring a silver dial and jubilee bracelet. Vintage timepiece.",
    category: "Jewelry",
    type: "LOST",
    status: "RECOVERED",
    location: "Sutton Place, Manhattan",
    date: "2023-10-12",
    reward: "0.20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC20epP5lGXF6Ojz7pNGsg4viBMNLWwgA2erJZ4f4tRUfb5fiYBeW-Q_MdVygbtAF_f2XL2GSm8UayrJWg-cBvE_ACw88TMCPeW19zkq29zRGQlnep7kAu5GoWWrkOzaJo3u0Su8REXEZ2kaAbHXO3SCbUrB3U-s2I-7LasJr5PdL_EHX7gylMuEWD6X_bFlewxAJgHFFvCQsV1zzCLizdkWW9VZ4dYbgd_8mFP-e-FRJutpPU7YQtw",
    reporter: "0x71C2B4fE95c102E2c53E3f7b2A3C139b8C4c3E1d",
    resolver: "0x442ffed3a2e1d74c3e800a52d8291a139bc73a9d",
    serialNumber: "62510H-R12",
    trustScore: 98.4,
    claims: [
      {
        id: "192",
        claimant: "0x442ffed3a2e1d74c3e800a52d8291a139bc73a9d",
        claimantName: "Jameson K.",
        claimantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBSE1i51TZ2P0O90sM0tcTrmeDRM4KZbnQSgQVPdqu8Ra8XiZZRybSkz-ooepQ7HepGAfzTjblnJGg2wWb520sm_6xROguj2FPWXcpYJkUHm7ay1wKeDgMiWcqnf5g3ZMQwq2CMY3WpDWBlUs9-ZN3kmJWKtIFa3JO13QM5utLD_cu6nhwLqM4lUFaXYVkhV2HL1xl8OOMnBzjB2GJWX0j1Y-cCt9f6mlbODgL2Omfyo01s3q5qK98",
        description: "Verification of serial number matches perfectly. Proof and purchase certificate verified.",
        status: "APPROVED"
      }
    ]
  }
];
