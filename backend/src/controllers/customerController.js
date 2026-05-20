const Customer = require('../models/customerModel');

const getCustomers = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status && ['tiem_nang', 'da_lien_he', 'than_thiet'].includes(status)) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [customers, total] = await Promise.all([
      Customer.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Customer.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: customers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};


const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      const err = new Error('Không tìm thấy khách hàng');
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};


const createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, address, status, notes } = req.body;
    const customer = await Customer.create({ name, email, phone, address, status, notes });

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
    }
    next(error);
  }
};


const updateCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, address, status, notes } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, status, notes },
      { new: true, runValidators: true }
    );

    if (!customer) {
      const err = new Error('Không tìm thấy khách hàng');
      err.statusCode = 404;
      throw err;
    }

    res.json({ success: true, data: customer });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
    }
    next(error);
  }
};


const updateCustomerStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['tiem_nang', 'da_lien_he', 'than_thiet'].includes(status)) {
      const err = new Error('Trạng thái không hợp lệ');
      err.statusCode = 400;
      throw err;
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!customer) {
      const err = new Error('Không tìm thấy khách hàng');
      err.statusCode = 404;
      throw err;
    }

    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      const err = new Error('Không tìm thấy khách hàng');
      err.statusCode = 404;
      throw err;
    }

    res.json({ success: true, message: 'Đã xóa khách hàng thành công' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  updateCustomerStatus,
  deleteCustomer,
};
