import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Save, RotateCcw, MessageSquare, Layout, LogOut, Trash2, CheckCircle, Shield, Key, User, Image, Briefcase, Code, Plus, Upload, Link as LinkIcon, GraduationCap, Globe, Trophy, Users, Heart } from 'lucide-react';
import { Project, Slide, SocialLink, Experience, Education, Award, Activity, SkillCategory } from '../types';

interface DashboardProps {
  onClose: () => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onClose, onLogout }) => {
  const { data, updateData, messages, markRead, deleteMessage, resetToDefaults } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'messages' | 'profile' | 'experience' | 'projects' | 'skills' | 'slideshow' | 'awards' | 'activities' | 'volunteering' | 'advanced' | 'security'>('messages');
  
  // JSON Editor State
  const [jsonInput, setJsonInput] = useState(JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  // Security State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passMessage, setPassMessage] = useState('');

  // CV & Image Upload State
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingProfileImg, setUploadingProfileImg] = useState(false);

  // Helper to handle Profile Updates
  const updateProfile = (field: string, value: string) => {
    updateData({
      ...data,
      profile: { ...data.profile, [field]: value }
    });
  };

  // Socials Management
  const [newSocial, setNewSocial] = useState<SocialLink>({ platform: '', url: '', icon: 'globe' });
  const addSocial = () => {
    if (!newSocial.platform || !newSocial.url) return;
    updateData({ ...data, socials: [...data.socials, newSocial] });
    setNewSocial({ platform: '', url: '', icon: 'globe' });
  };
  const removeSocial = (idx: number) => {
    updateData({ ...data, socials: data.socials.filter((_, i) => i !== idx) });
  };

  // Experience & Education Management
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [itemIndex, setItemIndex] = useState(-1);

  const saveExperience = () => {
    if (!editingExp || !editingExp.role) return;
    const newExp = [...data.experience];
    if (isNewItem) newExp.unshift(editingExp as Experience);
    else newExp[itemIndex] = editingExp as Experience;
    updateData({ ...data, experience: newExp });
    setEditingExp(null);
  };

  const saveEducation = () => {
     if (!editingEdu || !editingEdu.degree) return;
     const newEdu = [...data.education];
     if (isNewItem) newEdu.unshift(editingEdu as Education);
     else newEdu[itemIndex] = editingEdu as Education;
     updateData({ ...data, education: newEdu });
     setEditingEdu(null);
  };

  const deleteExperience = (idx: number) => {
    if (confirm('Delete this experience?')) {
      const newExp = data.experience.filter((_, i) => i !== idx);
      updateData({ ...data, experience: newExp });
    }
  };

  const deleteEducation = (idx: number) => {
    if (confirm('Delete this education?')) {
      const newEdu = data.education.filter((_, i) => i !== idx);
      updateData({ ...data, education: newEdu });
    }
  };

  // Awards Management
  const [editingAward, setEditingAward] = useState<Partial<Award> | null>(null);
  const saveAward = () => {
    if (!editingAward || !editingAward.title) return;
    const newAwards = [...data.awards];
    if (isNewItem) newAwards.unshift(editingAward as Award);
    else newAwards[itemIndex] = editingAward as Award;
    updateData({ ...data, awards: newAwards });
    setEditingAward(null);
  };
  const deleteAward = (idx: number) => {
    if (confirm('Delete this award?')) {
        updateData({ ...data, awards: data.awards.filter((_, i) => i !== idx) });
    }
  };

  // Activities (Extracurricular) Management
  const [editingActivity, setEditingActivity] = useState<Partial<Activity> | null>(null);
  const saveActivity = () => {
    if (!editingActivity || !editingActivity.role) return;
    const newActivities = [...data.extracurricular];
    if (isNewItem) newActivities.unshift(editingActivity as Activity);
    else newActivities[itemIndex] = editingActivity as Activity;
    updateData({ ...data, extracurricular: newActivities });
    setEditingActivity(null);
  };
  const deleteActivity = (idx: number) => {
    if (confirm('Delete this activity?')) {
        updateData({ ...data, extracurricular: data.extracurricular.filter((_, i) => i !== idx) });
    }
  };

  // Social Work Management
  const [editingSocialWork, setEditingSocialWork] = useState<Partial<Activity> | null>(null);
  const saveSocialWork = () => {
    if (!editingSocialWork || !editingSocialWork.role) return;
    const newSocialWork = [...data.socialWork];
    if (isNewItem) newSocialWork.unshift(editingSocialWork as Activity);
    else newSocialWork[itemIndex] = editingSocialWork as Activity;
    updateData({ ...data, socialWork: newSocialWork });
    setEditingSocialWork(null);
  };
  const deleteSocialWork = (idx: number) => {
    if (confirm('Delete this volunteering item?')) {
        updateData({ ...data, socialWork: data.socialWork.filter((_, i) => i !== idx) });
    }
  };

  // Skills Management
  const [editingSkill, setEditingSkill] = useState<Partial<SkillCategory> | null>(null);
  const [skillIndex, setSkillIndex] = useState(-1);
  const [isNewSkill, setIsNewSkill] = useState(false);

  const saveSkill = () => {
    if (!editingSkill || !editingSkill.category) return;
    const newSkills = [...data.skills];
    if (isNewSkill) newSkills.unshift(editingSkill as SkillCategory);
    else newSkills[skillIndex] = editingSkill as SkillCategory;
    updateData({ ...data, skills: newSkills });
    setEditingSkill(null);
  };

  const deleteSkill = (idx: number) => {
    if (confirm('Delete this skill category?')) {
      const newSkills = data.skills.filter((_, i) => i !== idx);
      updateData({ ...data, skills: newSkills });
    }
  };


  // CV Upload Handler
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      alert('File is too large for local storage (Max 1.5MB).');
      return;
    }

    setUploadingCv(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateProfile('resumeUrl', event.target.result as string);
        setUploadingCv(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (JPG, PNG).');
        return;
    }

    if (file.size > 1024 * 1024) {
        alert('Image is too large (Max 1MB). Please compress it first.');
        return;
    }

    setUploadingProfileImg(true);
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target?.result) {
            updateProfile('avatar', event.target.result as string);
            setUploadingProfileImg(false);
        }
    };
    reader.readAsDataURL(file);
  };

  // Helper to handle Project Updates
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [projectIndex, setProjectIndex] = useState<number>(-1);
  const [uploadingProjectImg, setUploadingProjectImg] = useState(false);

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }
    if (file.size > 800 * 1024) {
        alert('Image is too large (Max 800KB).');
        return;
    }

    setUploadingProjectImg(true);
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target?.result) {
            setEditingProject({ ...editingProject, image: event.target.result as string });
            setUploadingProjectImg(false);
        }
    };
    reader.readAsDataURL(file);
  };

  const saveProject = () => {
    if (!editingProject || !editingProject.title) return;
    
    const newProjects = [...data.projects];
    const projectToSave = editingProject as Project;
    
    if (typeof projectToSave.tags === 'string') {
        projectToSave.tags = (projectToSave.tags as string).split(',').map((t: string) => t.trim());
    }
    if (!projectToSave.image) projectToSave.image = "";

    if (isNewProject) {
      newProjects.unshift(projectToSave);
    } else {
      newProjects[projectIndex] = projectToSave;
    }
    
    updateData({ ...data, projects: newProjects });
    setEditingProject(null);
  };

  const deleteProject = (idx: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const newProjects = data.projects.filter((_, i) => i !== idx);
      updateData({ ...data, projects: newProjects });
    }
  };

  // Helper to handle Slideshow Updates
  const [newSlideUrl, setNewSlideUrl] = useState('');
  const [newSlideCaption, setNewSlideCaption] = useState('');

  const addSlide = () => {
    if (!newSlideUrl) return;
    const newSlide: Slide = {
      id: crypto.randomUUID(),
      image: newSlideUrl,
      caption: newSlideCaption || 'New Image'
    };
    updateData({
      ...data,
      slideshow: [newSlide, ...(data.slideshow || [])]
    });
    setNewSlideUrl('');
    setNewSlideCaption('');
  };

  const removeSlide = (id: string) => {
    updateData({
      ...data,
      slideshow: data.slideshow.filter(s => s.id !== id)
    });
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setJsonError(null);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      updateData(parsed);
      alert('Website updated successfully!');
    } catch (e) {
      setJsonError('Invalid JSON format.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPassMessage('Password must be at least 4 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassMessage('Passwords do not match.');
      return;
    }
    localStorage.setItem('admin_password', newPassword);
    setPassMessage('Password updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPassMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row animate-in fade-in duration-200">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-zinc-900 text-white p-6 flex flex-col shrink-0 overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 tracking-tight flex items-center gap-2">
           <Shield className="text-purple-500" />
           Admin Console
        </h2>
        
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <MessageSquare size={18} /> Messages
            {messages.some(m => !m.read) && <span className="ml-auto bg-red-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{messages.filter(m => !m.read).length}</span>}
          </button>
          
          <div className="pt-4 pb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Content</div>
          
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <User size={18} /> Profile & About
          </button>
          <button onClick={() => setActiveTab('experience')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'experience' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <GraduationCap size={18} /> Experience & Edu
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Briefcase size={18} /> Projects
          </button>
          <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'skills' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Code size={18} /> Technical Expertise
          </button>
          <button onClick={() => setActiveTab('awards')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'awards' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Trophy size={18} /> Awards
          </button>
          <button onClick={() => setActiveTab('activities')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'activities' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Users size={18} /> Activities
          </button>
          <button onClick={() => setActiveTab('volunteering')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'volunteering' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Heart size={18} /> Volunteering
          </button>
          <button onClick={() => setActiveTab('slideshow')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'slideshow' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Image size={18} /> Slideshow
          </button>

          <div className="pt-4 pb-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">System</div>

          <button onClick={() => setActiveTab('advanced')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'advanced' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Code size={18} /> Advanced (JSON)
          </button>
          <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'security' ? 'bg-purple-600' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Key size={18} /> Security
          </button>
        </nav>

        <div className="pt-6 border-t border-zinc-800 space-y-2 mt-auto">
           <button onClick={onClose} className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={18} /> Close
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col bg-zinc-100 dark:bg-zinc-900">
        <div className="flex-1 overflow-auto p-4 md:p-8">
        
        {activeTab === 'messages' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Inbox ({messages.length})</h3>
            {messages.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500">No messages yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-6 rounded-xl border transition-all ${msg.read ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-75' : 'bg-white dark:bg-zinc-800 border-purple-500 shadow-md'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-sm text-purple-600 hover:underline">{msg.email}</a>
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">{new Date(msg.date).toLocaleDateString()}</div>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap mb-4 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-lg text-sm">{msg.message}</p>
                    <div className="flex justify-end gap-2">
                      {!msg.read && <button onClick={() => markRead(msg.id)} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">Mark Read</button>}
                      <button onClick={() => deleteMessage(msg.id)} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-medium">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
            <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Profile & About Settings</h3>
            
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
                 <h4 className="font-bold text-lg text-purple-600 dark:text-purple-400">Basic Info</h4>
                 <div>
                   <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Display Name</label>
                   <input type="text" value={data.profile.name} onChange={(e) => updateProfile('name', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Role / Job Title</label>
                   <input type="text" value={data.profile.role} onChange={(e) => updateProfile('role', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Location</label>
                      <input type="text" value={data.profile.location} onChange={(e) => updateProfile('location', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Phone</label>
                      <input type="text" value={data.profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                    </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                   <input type="email" value={data.profile.email} onChange={(e) => updateProfile('email', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                 </div>
              </div>

              {/* Bio & Content */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
                 <h4 className="font-bold text-lg text-purple-600 dark:text-purple-400">About Content</h4>
                 <div>
                   <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Short Description (For Hero)</label>
                   <textarea rows={3} value={data.profile.description} onChange={(e) => updateProfile('description', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Full Bio (For About Page)</label>
                   <textarea rows={8} value={data.profile.bio || ''} onChange={(e) => updateProfile('bio', e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" placeholder="Tell your story..." />
                 </div>
              </div>

              {/* Social Links */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
                  <h4 className="font-bold text-lg text-purple-600 dark:text-purple-400">Social Links & Contacts</h4>
                  <div className="space-y-3">
                    {data.socials.map((social, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                         <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg font-mono text-xs w-24 text-center">{social.platform}</div>
                         <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 rounded-lg text-sm truncate border border-zinc-200 dark:border-zinc-700">{social.url}</div>
                         <button onClick={() => removeSocial(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={16}/></button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 items-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
                     <div className="flex-1 w-full">
                        <label className="block text-xs font-medium mb-1">Platform Name</label>
                        <input type="text" placeholder="e.g. GitHub" value={newSocial.platform} onChange={e => setNewSocial({...newSocial, platform: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     </div>
                     <div className="flex-[2] w-full">
                        <label className="block text-xs font-medium mb-1">URL (https:// or mailto:)</label>
                        <input type="text" placeholder="https://..." value={newSocial.url} onChange={e => setNewSocial({...newSocial, url: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     </div>
                     <div className="flex-1 w-full">
                        <label className="block text-xs font-medium mb-1">Icon</label>
                        <select value={newSocial.icon} onChange={e => setNewSocial({...newSocial, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700">
                           <option value="globe">Globe</option>
                           <option value="github">GitHub</option>
                           <option value="linkedin">LinkedIn</option>
                           <option value="twitter">Twitter</option>
                           <option value="dribbble">Dribbble</option>
                           <option value="gmail">Gmail / Email</option>
                           <option value="whatsapp">WhatsApp</option>
                        </select>
                     </div>
                     <button onClick={addSocial} className="bg-purple-600 text-white p-2.5 rounded-lg hover:bg-purple-700 w-full md:w-auto flex justify-center"><Plus size={18} /></button>
                  </div>
              </div>
              
              {/* Media (CV + Avatar) */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">Profile Picture</label>
                  <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-100 shrink-0">
                         {data.profile.avatar ? <img src={data.profile.avatar} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4" />}
                      </div>
                      <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 cursor-pointer hover:bg-zinc-100 ${uploadingProfileImg ? 'opacity-50' : ''}`}>
                          <Upload size={14} /> <span className="text-sm">Upload Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
                      </label>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">CV / Resume</label>
                  <label className={`flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 cursor-pointer hover:bg-zinc-100 ${uploadingCv ? 'opacity-50' : ''}`}>
                      <Upload size={14} /> <span className="text-sm">{uploadingCv ? 'Uploading...' : 'Upload PDF'}</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={handleCvUpload} />
                  </label>
                  {data.profile.resumeUrl?.startsWith('data:') && <div className="text-xs text-green-600 mt-2 flex gap-1 items-center"><CheckCircle size={10}/> PDF Stored</div>}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ... Rest of Dashboard (Experience, Projects, etc. remain unchanged in this block) ... */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
            
            {/* Work Experience Section */}
            <div className="mb-12">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Briefcase size={24}/> Work Experience</h3>
                  <button onClick={() => { setEditingExp({}); setIsNewItem(true); }} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-bold"><Plus size={16} /> Add Work</button>
               </div>

               {editingExp ? (
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                     <h4 className="font-bold">Edit Experience</h4>
                     <div className="grid md:grid-cols-2 gap-4">
                        <input placeholder="Role / Job Title" value={editingExp.role || ''} onChange={e => setEditingExp({...editingExp, role: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                        <input placeholder="Company Name" value={editingExp.company || ''} onChange={e => setEditingExp({...editingExp, company: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     </div>
                     <input placeholder="Period (e.g. 2023 - Present)" value={editingExp.year || ''} onChange={e => setEditingExp({...editingExp, year: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     <textarea placeholder="Description" rows={3} value={editingExp.description || ''} onChange={e => setEditingExp({...editingExp, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingExp(null)} className="px-4 py-2 text-sm text-zinc-500">Cancel</button>
                        <button onClick={saveExperience} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold">Save</button>
                     </div>
                  </div>
               ) : (
                  <div className="space-y-3">
                     {data.experience.map((exp, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                           <div>
                              <div className="font-bold">{exp.role} <span className="text-zinc-400 font-normal text-sm">at {exp.company}</span></div>
                              <div className="text-xs text-zinc-500">{exp.year}</div>
                           </div>
                           <div className="flex gap-2">
                              <button onClick={() => { setEditingExp(exp); setIsNewItem(false); setItemIndex(i); }} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-xs font-bold">Edit</button>
                              <button onClick={() => deleteExperience(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded text-xs font-bold">Delete</button>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* Education Section */}
            <div>
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><GraduationCap size={24}/> Education</h3>
                  <button onClick={() => { setEditingEdu({}); setIsNewItem(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-bold"><Plus size={16} /> Add Education</button>
               </div>

               {editingEdu ? (
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                     <h4 className="font-bold">Edit Education</h4>
                     <div className="grid md:grid-cols-2 gap-4">
                        <input placeholder="Degree" value={editingEdu.degree || ''} onChange={e => setEditingEdu({...editingEdu, degree: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                        <input placeholder="Institution" value={editingEdu.institution || ''} onChange={e => setEditingEdu({...editingEdu, institution: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     </div>
                     <input placeholder="Year" value={editingEdu.year || ''} onChange={e => setEditingEdu({...editingEdu, year: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     <textarea placeholder="Description (Optional)" rows={3} value={editingEdu.description || ''} onChange={e => setEditingEdu({...editingEdu, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                     <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingEdu(null)} className="px-4 py-2 text-sm text-zinc-500">Cancel</button>
                        <button onClick={saveEducation} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Save</button>
                     </div>
                  </div>
               ) : (
                  <div className="space-y-3">
                     {data.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                           <div>
                              <div className="font-bold">{edu.degree}</div>
                              <div className="text-sm text-zinc-500">{edu.institution} ({edu.year})</div>
                           </div>
                           <div className="flex gap-2">
                              <button onClick={() => { setEditingEdu(edu); setIsNewItem(false); setItemIndex(i); }} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-xs font-bold">Edit</button>
                              <button onClick={() => deleteEducation(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded text-xs font-bold">Delete</button>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

          </div>
        )}
        
        {/* ... Rest of Dashboard (Awards, Activities, Volunteering, etc.) remain unchanged ... */}
        {activeTab === 'awards' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Trophy size={24}/> Awards & Recognition</h3>
              <button onClick={() => { setEditingAward({}); setIsNewItem(true); }} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm font-bold"><Plus size={16} /> Add Award</button>
            </div>
             {editingAward ? (
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <h4 className="font-bold">Edit Award</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                      <input placeholder="Award Title" value={editingAward.title || ''} onChange={e => setEditingAward({...editingAward, title: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                      <input placeholder="Issuer / Organization" value={editingAward.issuer || ''} onChange={e => setEditingAward({...editingAward, issuer: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  </div>
                  <input placeholder="Year" value={editingAward.year || ''} onChange={e => setEditingAward({...editingAward, year: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  <textarea placeholder="Description (Optional)" rows={3} value={editingAward.description || ''} onChange={e => setEditingAward({...editingAward, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingAward(null)} className="px-4 py-2 text-sm text-zinc-500">Cancel</button>
                      <button onClick={saveAward} className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-bold">Save</button>
                  </div>
                </div>
             ) : (
                <div className="space-y-3">
                  {data.awards.map((award, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <div>
                            <div className="font-bold">{award.title}</div>
                            <div className="text-sm text-zinc-500">{award.issuer} ({award.year})</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setEditingAward(award); setIsNewItem(false); setItemIndex(i); }} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-xs font-bold">Edit</button>
                            <button onClick={() => deleteAward(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded text-xs font-bold">Delete</button>
                        </div>
                      </div>
                  ))}
                </div>
             )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Code size={24}/> Technical Expertise</h3>
              <button onClick={() => { setEditingSkill({ category: '', items: [] }); setIsNewSkill(true); }} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-bold"><Plus size={16} /> Add Skill Category</button>
            </div>
             {editingSkill ? (
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <h4 className="font-bold">{isNewSkill ? 'Add New' : 'Edit'} Skill Category</h4>
                  <div>
                      <label className="block text-sm font-medium mb-2">Category Name</label>
                      <input placeholder="E.g. Programming Languages, Frameworks, Databases" value={editingSkill.category || ''} onChange={e => setEditingSkill({...editingSkill, category: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                      <textarea placeholder="E.g. JavaScript, TypeScript, React, Next.js" rows={3} value={Array.isArray(editingSkill.items) ? editingSkill.items.join(', ') : editingSkill.items} onChange={e => setEditingSkill({...editingSkill, items: e.target.value.split(',').map((item: string) => item.trim())})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                      <p className="text-xs text-zinc-500 mt-2">Separate each skill with a comma</p>
                  </div>
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingSkill(null)} className="px-4 py-2 text-sm text-zinc-500">Cancel</button>
                      <button onClick={saveSkill} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold">Save</button>
                  </div>
                </div>
             ) : (
                <div className="space-y-3">
                  {data.skills.map((skill, i) => (
                      <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 gap-4">
                        <div className="flex-1">
                            <div className="font-bold text-lg mb-2">{skill.category}</div>
                            <div className="flex flex-wrap gap-2">
                              {skill.items.map((item, idx) => (
                                <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">{item}</span>
                              ))}
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button onClick={() => { setEditingSkill(skill); setIsNewSkill(false); setSkillIndex(i); }} className="flex-1 sm:flex-none px-4 py-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">Edit</button>
                            <button onClick={() => deleteSkill(i)} className="flex-1 sm:flex-none px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">Delete</button>
                        </div>
                      </div>
                  ))}
                </div>
             )}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Users size={24}/> Activities (Extracurricular)</h3>
              <button onClick={() => { setEditingActivity({}); setIsNewItem(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-bold"><Plus size={16} /> Add Activity</button>
            </div>
             {editingActivity ? (
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <h4 className="font-bold">Edit Activity</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                      <input placeholder="Role (e.g. Member, Lead)" value={editingActivity.role || ''} onChange={e => setEditingActivity({...editingActivity, role: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                      <input placeholder="Organization" value={editingActivity.organization || ''} onChange={e => setEditingActivity({...editingActivity, organization: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  </div>
                  <input placeholder="Period" value={editingActivity.period || ''} onChange={e => setEditingActivity({...editingActivity, period: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  <textarea placeholder="Description" rows={3} value={editingActivity.description || ''} onChange={e => setEditingActivity({...editingActivity, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingActivity(null)} className="px-4 py-2 text-sm text-zinc-500">Cancel</button>
                      <button onClick={saveActivity} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Save</button>
                  </div>
                </div>
             ) : (
                <div className="space-y-3">
                  {data.extracurricular.map((act, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <div>
                            <div className="font-bold">{act.role}</div>
                            <div className="text-sm text-zinc-500">{act.organization} ({act.period})</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setEditingActivity(act); setIsNewItem(false); setItemIndex(i); }} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-xs font-bold">Edit</button>
                            <button onClick={() => deleteActivity(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded text-xs font-bold">Delete</button>
                        </div>
                      </div>
                  ))}
                </div>
             )}
          </div>
        )}

        {activeTab === 'volunteering' && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Heart size={24}/> Volunteering & Social Work</h3>
              <button onClick={() => { setEditingSocialWork({}); setIsNewItem(true); }} className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 text-sm font-bold"><Plus size={16} /> Add Work</button>
            </div>
             {editingSocialWork ? (
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <h4 className="font-bold">Edit Social Work</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                      <input placeholder="Role" value={editingSocialWork.role || ''} onChange={e => setEditingSocialWork({...editingSocialWork, role: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                      <input placeholder="Organization" value={editingSocialWork.organization || ''} onChange={e => setEditingSocialWork({...editingSocialWork, organization: e.target.value})} className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  </div>
                  <input placeholder="Period" value={editingSocialWork.period || ''} onChange={e => setEditingSocialWork({...editingSocialWork, period: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  <textarea placeholder="Description" rows={3} value={editingSocialWork.description || ''} onChange={e => setEditingSocialWork({...editingSocialWork, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingSocialWork(null)} className="px-4 py-2 text-sm text-zinc-500">Cancel</button>
                      <button onClick={saveSocialWork} className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-bold">Save</button>
                  </div>
                </div>
             ) : (
                <div className="space-y-3">
                  {data.socialWork.map((sw, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                        <div>
                            <div className="font-bold">{sw.role}</div>
                            <div className="text-sm text-zinc-500">{sw.organization} ({sw.period})</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setEditingSocialWork(sw); setIsNewItem(false); setItemIndex(i); }} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-xs font-bold">Edit</button>
                            <button onClick={() => deleteSocialWork(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded text-xs font-bold">Delete</button>
                        </div>
                      </div>
                  ))}
                </div>
             )}
          </div>
        )}

        {activeTab === 'projects' && (
           <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-300 pb-12">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Projects</h3>
                <button onClick={() => { setEditingProject({}); setIsNewProject(true); }} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"><Plus size={16} /> Add Project</button>
             </div>
             
             {editingProject ? (
               <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">{isNewProject ? 'New Project' : 'Edit Project'}</h4>
                    <button onClick={() => setEditingProject(null)} className="text-zinc-500 hover:text-zinc-900"><X size={20} /></button>
                  </div>

                  <div className="grid gap-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Project Title</label>
                        <input type="text" placeholder="E.g. E-Commerce App" value={editingProject.title || ''} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border bg-transparent dark:border-zinc-700" />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea placeholder="Describe what you built..." rows={4} value={editingProject.description || ''} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border bg-transparent dark:border-zinc-700" />
                    </div>
                    
                    {/* Project Link */}
                    <div>
                        <label className="block text-sm font-medium mb-1 flex items-center gap-2"><LinkIcon size={14} /> Project Link / URL</label>
                        <input type="text" placeholder="https://github.com/..." value={editingProject.link || ''} onChange={e => setEditingProject({...editingProject, link: e.target.value})} className="w-full px-4 py-2 rounded-lg border bg-transparent dark:border-zinc-700" />
                    </div>

                    {/* Image Management */}
                    <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">Project Image</label>
                        
                        <div className="flex flex-col md:flex-row gap-4">
                             {/* Preview */}
                            <div className="shrink-0">
                                <div className="w-32 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-300 dark:border-zinc-700">
                                    {editingProject.image ? (
                                        <img src={editingProject.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Image size={24} className="text-zinc-400" />
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 space-y-3">
                                <input type="text" placeholder="Image URL (https://...)" value={editingProject.image || ''} onChange={e => setEditingProject({...editingProject, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-900 dark:border-zinc-700 text-sm" />
                                
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-zinc-500 font-medium">OR</span>
                                    <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-zinc-400 dark:border-zinc-600 bg-transparent cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${uploadingProjectImg ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <Upload size={14} />
                                        <span className="text-sm">{uploadingProjectImg ? 'Uploading...' : 'Upload Image'}</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleProjectImageUpload} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tags (Technologies used)</label>
                        <input type="text" placeholder="React, Node.js, TypeScript..." value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags || ''} onChange={e => setEditingProject({...editingProject, tags: e.target.value as any})} className="w-full px-4 py-2 rounded-lg border bg-transparent dark:border-zinc-700" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-4">
                    <button onClick={() => setEditingProject(null)} className="px-6 py-2.5 text-zinc-600 dark:text-zinc-400 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">Cancel</button>
                    <button onClick={saveProject} className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/20">Save Project</button>
                  </div>
               </div>
             ) : (
               <div className="grid gap-4">
                 {data.projects.map((p, i) => (
                   <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 gap-4">
                      <div className="flex gap-4 items-center">
                         <div className="w-20 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                             <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
                         </div>
                         <div>
                            <div className="font-bold text-lg">{p.title}</div>
                            <div className="text-xs text-zinc-500 max-w-md truncate">{p.link || 'No link'}</div>
                         </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => { setEditingProject(p); setProjectIndex(i); setIsNewProject(false); }} className="flex-1 md:flex-none px-4 py-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">Edit</button>
                        <button onClick={() => deleteProject(i)} className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 rounded-lg text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">Delete</button>
                      </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
        )}

        {activeTab === 'slideshow' && (
          <div className="max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-300">
             <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Slideshow Gallery</h3>
             
             <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 mb-6">
                <h4 className="font-bold mb-4">Add New Slide</h4>
                <div className="flex flex-col gap-3">
                   <input type="text" placeholder="Image URL (Unsplash, etc.)" value={newSlideUrl} onChange={e => setNewSlideUrl(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                   <input type="text" placeholder="Caption" value={newSlideCaption} onChange={e => setNewSlideCaption(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" />
                   <button onClick={addSlide} className="self-end px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Slide</button>
                </div>
             </div>

             <div className="space-y-4">
                {(data.slideshow || []).map((slide) => (
                   <div key={slide.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 items-center">
                      <img src={slide.image} className="w-24 h-16 object-cover rounded-lg" />
                      <div className="flex-1 font-medium">{slide.caption}</div>
                      <button onClick={() => removeSlide(slide.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="max-w-4xl mx-auto h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Advanced JSON Editor</h3>
                 <p className="text-sm text-zinc-500">Full control over every field.</p>
              </div>
              <div className="flex gap-3">
                 <button onClick={resetToDefaults} className="flex items-center gap-2 px-4 py-2 text-zinc-500 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-sm font-medium"><RotateCcw size={16} /> Reset</button>
                 <button onClick={handleSaveJson} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-bold"><Save size={16} /> Save Changes</button>
              </div>
            </div>
            {jsonError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{jsonError}</div>}
            <div className="flex-1 relative rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-950">
              <textarea value={jsonInput} onChange={handleJsonChange} className="w-full h-full p-6 font-mono text-sm bg-transparent resize-none focus:outline-none custom-scrollbar" spellCheck={false} />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-xl mx-auto mt-10 animate-in slide-in-from-right-4 duration-300">
             <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-2xl font-bold mb-2">Security Settings</h3>
                <p className="text-zinc-500 mb-8">Update your admin password.</p>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div><label className="block text-sm font-medium mb-2">New Password</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" /></div>
                  <div><label className="block text-sm font-medium mb-2">Confirm Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700" /></div>
                  {passMessage && <div className={`p-3 rounded-lg text-sm font-medium ${passMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{passMessage}</div>}
                  <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700">Update Password</button>
                </form>
             </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};