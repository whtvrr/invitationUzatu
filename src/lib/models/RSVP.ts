import mongoose, { Schema, Document } from 'mongoose';

export interface IRSVP extends Document {
  timestamp: Date;
  name: string;
  attendance: 'come' | 'with' | 'no';
  guestsCount?: number;
  guestNames?: string[];
  phone?: string;
  userAgent?: string;
  ip?: string;
}

const RSVPSchema = new Schema<IRSVP>({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  attendance: {
    type: String,
    required: true,
    enum: ['come', 'with', 'no']
  },
  guestsCount: {
    type: Number,
    min: 0,
    max: 10,
    required: function(this: IRSVP) {
      return this.attendance === 'with';
    }
  },
  guestNames: [{
    type: String,
    trim: true,
    maxlength: 100
  }],
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  userAgent: {
    type: String,
    maxlength: 500
  },
  ip: {
    type: String,
    maxlength: 45 // IPv6 max length
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for better performance
RSVPSchema.index({ timestamp: -1 });
RSVPSchema.index({ attendance: 1 });
// Text search index removed to avoid language conflicts

export default mongoose.models.RSVP || mongoose.model<IRSVP>('RSVP', RSVPSchema);