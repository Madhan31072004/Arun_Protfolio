const Quotation = require('../models/Quotation');

// Generate unique quotation number
const generateQuotationNumber = async (userId) => {
  const year = new Date().getFullYear();
  const count = await Quotation.countDocuments({ userId });
  const num = String(count + 1).padStart(3, '0');
  return `AQ-${year}-${num}`;
};

// @route   GET /api/quotations
exports.getQuotations = async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const quotations = await Quotation.find(filter)
      .populate('clientId', 'name phone projectName')
      .sort({ updatedAt: -1 });

    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/quotations
exports.createQuotation = async (req, res) => {
  try {
    const quotationNumber = await generateQuotationNumber(req.user._id);
    const quotation = await Quotation.create({
      ...req.body,
      userId: req.user._id,
      quotationNumber,
    });
    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/quotations/:id
exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findOne({ _id: req.params.id, userId: req.user._id })
      .populate('clientId')
      .populate('areas.items.materialId', 'name category unit unitPrice');

    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/quotations/:id
exports.updateQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findOne({ _id: req.params.id, userId: req.user._id });
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });

    Object.assign(quotation, req.body);
    await quotation.save(); // triggers pre-save calculations

    const populated = await quotation.populate('clientId', 'name phone projectName');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/quotations/:id
exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    res.json({ message: 'Quotation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PATCH /api/quotations/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const quotation = await Quotation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true }
    );
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
