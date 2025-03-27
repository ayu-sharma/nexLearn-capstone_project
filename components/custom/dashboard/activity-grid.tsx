import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Target, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Interface for study session
interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: string;
  notes?: string;
}

const StudyActivityTracker: React.FC = () => {
  // State for study sessions
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    // Load from local storage on initial render
    const savedSessions = localStorage.getItem('studySessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  // State for new session input
  const [newSession, setNewSession] = useState<Partial<StudySession>>({
    subject: '',
    duration: 0,
    notes: ''
  });

  // State for editing
  const [editingSession, setEditingSession] = useState<string | null>(null);

  // Save sessions to local storage whenever sessions change
  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(sessions));
  }, [sessions]);

  // Calculate total study time
  const totalStudyTime = sessions.reduce((total, session) => total + session.duration, 0);

  // Add new study session
  const handleAddSession = () => {
    if (!newSession.subject || !newSession.duration) return;

    const sessionToAdd: StudySession = {
      id: Date.now().toString(),
      subject: newSession.subject || '',
      duration: newSession.duration || 0,
      date: new Date().toISOString().split('T')[0],
      notes: newSession.notes
    };

    setSessions([...sessions, sessionToAdd]);
    
    // Reset new session input
    setNewSession({
      subject: '',
      duration: 0,
      notes: ''
    });
  };

  // Delete a study session
  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  // Start editing a session
  const handleEditSession = (session: StudySession) => {
    setEditingSession(session.id);
    setNewSession({
      subject: session.subject,
      duration: session.duration,
      notes: session.notes
    });
  };

  // Save edited session
  const handleSaveEdit = () => {
    if (!editingSession || !newSession.subject || !newSession.duration) return;

    setSessions(sessions.map(session => 
      session.id === editingSession 
        ? {
            ...session,
            subject: newSession.subject || '',
            duration: newSession.duration || 0,
            notes: newSession.notes
          }
        : session
    ));

    // Reset editing state
    setEditingSession(null);
    setNewSession({
      subject: '',
      duration: 0,
      notes: ''
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingSession(null);
    setNewSession({
      subject: '',
      duration: 0,
      notes: ''
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#3b82f6]" />
            Study Activity Tracker
          </CardTitle>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">{totalStudyTime} mins</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* New Session Input */}
        <div className="space-y-2 mb-4">
          <Input 
            placeholder="Subject"
            value={newSession.subject || ''}
            onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
            className="w-full"
          />
          <Input 
            type="number"
            placeholder="Duration (minutes)"
            value={newSession.duration || ''}
            onChange={(e) => setNewSession({...newSession, duration: Number(e.target.value)})}
            className="w-full"
          />
          <Input 
            placeholder="Optional notes"
            value={newSession.notes || ''}
            onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
            className="w-full"
          />
          {editingSession ? (
            <div className="flex gap-2">
              <Button 
                style={{ backgroundColor: '#3b82f6' }} 
                onClick={handleSaveEdit} 
                className="w-full"
              >
                <Save className="mr-2 w-4 h-4" /> Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancelEdit} 
                className="w-full"
              >
                <X className="mr-2 w-4 h-4" /> Cancel
              </Button>
            </div>
          ) : (
            <Button 
              style={{ backgroundColor: '#3b82f6' }}
              onClick={handleAddSession} 
              className="w-full"
              disabled={!newSession.subject || !newSession.duration}
            >
              <Plus className="mr-2 w-4 h-4" /> Add Study Session
            </Button>
          )}
        </div>

        {/* Sessions List */}
        <div className="space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                style={{ color: '#3b82f6', borderColor: '#3b82f6' }}
              >
                <Target className="mr-2 w-4 h-4" /> View All Sessions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[500px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Study Sessions History</DialogTitle>
              </DialogHeader>
              {sessions.length === 0 ? (
                <p className="text-center text-gray-500">No study sessions yet</p>
              ) : (
                sessions.map(session => (
                  <div 
                    key={session.id} 
                    className="border rounded-lg p-3 mb-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{session.subject}</p>
                      <p className="text-sm text-gray-600">
                        {session.date} | {session.duration} mins
                      </p>
                      {session.notes && (
                        <p className="text-xs text-gray-500 mt-1">{session.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="outline"
                        style={{ color: '#3b82f6', borderColor: '#3b82f6' }}
                        onClick={() => handleEditSession(session)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="destructive"
                        style={{ backgroundColor: '#ef4444' }}
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyActivityTracker;