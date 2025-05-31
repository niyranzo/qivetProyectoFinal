import Animal from '../models/Animal.js';
import Consultation from '../models/Consultation.js';
import Vaccination from '../models/Vaccination.js';
import { Op } from 'sequelize';


export const createConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.findAll();
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (consultation) {
      res.json(consultation);
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateConsultation = async (req, res) => {
  try {
    const [updated] = await Consultation.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedConsultation = await Consultation.findByPk(req.params.id);
      res.json(updatedConsultation);
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteConsultation = async (req, res) => {
  try {
    const deleted = await Consultation.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Consulta eliminada' });
    } else {
      res.status(404).json({ error: 'Consulta no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addVaccineToConsultation = async (req, res) => {
  const { vaccine_name, next_dose } = req.body;

  try {
    const consultation = await Consultation.findByPk(req.params.id);

    if (!consultation) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    consultation.vaccine = vaccine_name;
    await consultation.save();

    const vaccination = await Vaccination.create({
      id_animal: consultation.id_animal,
      vaccine_name,
      date: consultation.visitDate,
      next_dose: next_dose || null
    });

    res.status(201).json({
      message: 'Vacuna agregada y registrada',
      consultation,
      vaccination
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const setNextVisitDate = async (req, res) => {
  const { nextVisitDate } = req.body;
  const id_animal = req.params.id;

  try {
    // Busca la consulta más reciente del animal
    let consultation = await Consultation.findOne({
      where: { id_animal },
      order: [['visitDate', 'DESC']],
    });

    if (consultation) {
      if (consultation.nextVisitDate) {
        return res.status(400).json({
          error: 'Este animal ya tiene una próxima visita programada.',
          nextVisitDate: consultation.nextVisitDate,
        });
      }

      // Actualiza la consulta existente con la nueva fecha
      consultation.nextVisitDate = nextVisitDate;
      await consultation.save();
    } else {
      // Si no hay consulta previa, crea una nueva con la próxima visita
      consultation = await Consultation.create({
        id_animal,
        description: 'Cita inicial programada.',
        visitDate: new Date(), // Hoy como fecha de creación
        nextVisitDate,
      });
    }

    res.status(200).json({
      message: 'Próxima visita asignada correctamente',
      consultation,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getUpcomingVisitDates = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const consultations = await Consultation.findAll({
      where: {
        nextVisitDate: {
          [Op.gte]: today
        }
      },
      attributes: ['nextVisitDate']
    });

    const reservedDates = consultations
      .map(c => c.nextVisitDate)
      .filter(date => date !== null);

    res.status(200).json({ reservedDates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllConsultationsByid_animal = async (req, res) => {
  const { id_animal } = req.params;

  try {
    const consultations = await Consultation.findAll({
      where: { id_animal },
      order: [['visitDate', 'DESC']]
    });

    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLastConsultationByid_animal = async (req, res) => {
  const { id_animal } = req.params;

  try {
    const lastConsultation = await Consultation.findOne({
      where: { id_animal },
      order: [['visitDate', 'DESC']]
    });

    if (!lastConsultation) {
       return res.status(200).json(null);
    }

    res.status(200).json(lastConsultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUpcomingVisitDatesWithAnimal = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const consultations = await Consultation.findAll({
      where: {
        nextVisitDate: {
          [Op.gte]: today
        }
      },
      include: [
        {
          model: Animal,
          as: 'animal',
          attributes: ['id_animal', 'name']

        }
      ]
    });

    const reservedDates = consultations
      .filter(c => c.nextVisitDate !== null)
      .map(c => ({
        id_consultation: c.id,
        date: c.nextVisitDate,
        animalName: c.animal?.name || 'Desconocido'
      }));

    res.status(200).json({ reservedDates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteNextVisitDate = async (req, res) => {
  try {
    
    const { id } = req.params;

    const consultation = await Consultation.findByPk(id);
    if (!consultation) {
        return res.status(404).json({ message: 'Consulta no encontrada.' });
    }

    consultation.nextVisitDate = null;

    await consultation.save();

    return res.status(200).json({ message: 'Fecha de próxima visita eliminada.' });
  } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar la fecha de próxima visita.' });
  }
}


